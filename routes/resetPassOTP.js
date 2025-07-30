const express = require("express");
const resetOTPRoute = express.Router();
const { UserModel } = require('../model/model');
const resetOTPController = require('../controller/reset_otp.controller.js')
const { isNull, isUndefined, isMobile } = require("../dataVerification");

const resetPassMiddleWare = async (req, res, next) => {

    const { mobile } = req.body;

    if (isUndefined(mobile) || isNull(mobile) || !isMobile(mobile)) {
        return res.json({ message: "INVALID_DATA" });
    } else {
        const user = await UserModel.findOne({ $and: [{ mobile: mobile }, { verified: 1 }] });
        if (user) {
            const updated_at = user.updated_at;
            const time_now = new Date().getTime();
            if (((time_now - updated_at) / 1000) < 90) {
                res.json({ message: 'TIME_ERROR', time_passed: (time_now - updated_at) / 1000 })
            } else {
                next()
            }
        } else {
            res.json({ message: 'USER_NOT_EXIST' });
        }
    }
}

resetOTPRoute.post("/", resetPassMiddleWare, resetOTPController.sendOTP);
module.exports = resetOTPRoute;