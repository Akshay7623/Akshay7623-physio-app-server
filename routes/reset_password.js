const express = require("express");
const resetPasswordRoute = express.Router();
const { UserModel } = require('../model/model');
const resetPasswordController = require('../controller/reset_password.controller.js')
const { isNull, isUndefined, isMobile, isPassword } = require("../dataVerification");

const resetPasswordMiddleWare = async (req, res, next) => {

    const { mobile, otp, new_password } = req.body;

    if (isUndefined(mobile) || isNull(mobile) || !isMobile(mobile) || isNull(otp) || isUndefined(otp) || !isPassword(new_password)) {
        return res.json({ message: "INVALID_DATA" });
    } else {
        const user = await UserModel.findOne({ $and: [{ mobile: mobile }, { verified: 1 }] });
        if (user) {
            req.body.otp_id = user.otp_id;
            req.body.otp_token = user.otp_token;
            next()
        } else {
            res.json({ message: 'USER_NOT_EXIST' });
        }
    }
}

resetPasswordRoute.post("/", resetPasswordMiddleWare, resetPasswordController.resetPassword);
module.exports = resetPasswordRoute;