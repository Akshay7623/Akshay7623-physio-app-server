const express = require("express");
const submitOTPRoute = express.Router();
const submitOTPController = require('../controller/submit_otp.controller.js')

const { isNull, isUndefined, isMobile, isPassword } = require("../dataVerification");

const verifyData = (req, res, next) => {

    const { mobile, otp, password } = req.body;

    if (isUndefined(mobile) || isNull(mobile) || !isMobile(mobile) || isNull(otp) || isUndefined(otp) || !isPassword(password)) {
        return res.json({ message: "INVALID_DATA" });
    } else {
        next()
    }
}


submitOTPRoute.post("/", verifyData, submitOTPController.submitOTP);
module.exports = submitOTPRoute;