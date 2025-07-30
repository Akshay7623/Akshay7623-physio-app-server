const express = require('express')
const Router = express.Router()
const Controller = require('../controller/submit_otp_update_mobile.controller.js');
const session_key = process.env.SESSION_KEY;
const { isValidtoken, isUndefined, isNull, isMobile } = require('../dataVerification.js');

const middleware = async (req, res, next) => {

    const { otp, mobile } = req.body;
    const Bearer = req.headers["authorization"];

    if (isUndefined(otp) || isNull(otp) || isUndefined(mobile) || isNull(mobile) || !isMobile(mobile)) {
        res.json({ message: 'INVALID_DATA' })
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

Router.post('/', middleware, Controller.submitOTP)
module.exports = Router