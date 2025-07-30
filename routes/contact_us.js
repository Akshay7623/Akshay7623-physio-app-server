const express = require('express')
const Router = express.Router()
const Controller = require('../controller/contact_us.controller.js');
const { isNull, isUndefined, isEmail, isMobile } = require('../dataVerification.js');

const middleware = (req, res, next) => {

    const { full_name, mobile, email, message } = req.body;

    if (isNull(full_name) || isUndefined(full_name) || isNull(mobile) || isUndefined(mobile) || !isMobile(mobile) || isNull(email) || isUndefined(email) || !isEmail(email) || isNull(message) || isUndefined(message)) {
        return res.json({ message: 'INVALID_DATA' })
    } else {
        next()
    }


}

Router.post('/', middleware, Controller.ContactUs)
module.exports = Router