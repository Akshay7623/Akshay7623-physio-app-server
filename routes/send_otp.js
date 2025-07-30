const express = require("express");
const sendOTPRoute = express.Router();
const { UserModel } = require('../model/model');
const sendOTPController = require('../controller/send_otp.controller.js');

const { isNull, isUndefined, isMobile, isPassword } = require("../dataVerification");

const sendOTPMiddleWare = async (req, res, next) => {

    const { mobile, name, password } = req.body;
    req.body.old_user = 0;

    if (isUndefined(mobile) || isNull(mobile) || !isMobile(mobile) || isNull(name) || isUndefined(name) || !isPassword(password)) {
        return res.json({ message: "INVALID_DATA" });
    } else {
        const old_user = await UserModel.findOne({ mobile: mobile });

        if (old_user) {
            req.body.old_user = 1;
            if (old_user.verified === 1) {
                res.json({ message: 'USER_EXIST' });
            } else {
                const time_now = new Date().getTime();
                const created_at = old_user.created_at;

                if (((time_now - created_at) / 1000) < 90) {
                    res.json({ message: 'TIME_ERROR', time_passed: (time_now - created_at) / 1000 })
                } else {
                    next()
                }
            }
        } else {
            next()
        }
    }
}

sendOTPRoute.post("/", sendOTPMiddleWare, sendOTPController.sendOTP);
module.exports = sendOTPRoute;