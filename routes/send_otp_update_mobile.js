const express = require('express')
const sendOTPUpdateMobileRouter = express.Router()
const sendOTPUpdateController = require('../controller/send_otp_update_mobile.controller.js');
const session_key = process.env.SESSION_KEY;
const { isValidtoken, isUndefined, isNull, isMobile } = require('../dataVerification.js');
const { UserModel } = require('../model/model.js');

const sendOTPUpdateMobileMiddleware = async (req, res, next) => {

    const { mobile } = req.body;
    const Bearer = req.headers["authorization"];

    if (isUndefined(mobile) || isNull(mobile) || !isMobile(mobile)) {
        res.json({ message: 'INVALID_DATA' })
    } else {
        const db_user = await UserModel.findOne({ mobile: mobile });
        if (db_user) {
            res.json({ message: 'DATA_EXIST' })
        } else {
            const data = isValidtoken(Bearer, session_key);
            if (data) {
                req.body.userId = data._id;
                next();
            } else {
                res.json({ message: 'AUTH_FAILED' });
            }
        }
    }
}

sendOTPUpdateMobileRouter.post('/', sendOTPUpdateMobileMiddleware, sendOTPUpdateController.sendOTP)
module.exports = sendOTPUpdateMobileRouter