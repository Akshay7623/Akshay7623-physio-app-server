const express = require('express')
const loginRouter = express.Router()
const loginController = require('../controller/login.controller.js');
const { isNull, isUndefined, isPassword, isMobile } = require('../dataVerification.js');

const loginMiddleware = (req, res, next) => {
    if (isNull(req.body.mobile) || isNull(req.body.password) || isUndefined(req.body.mobile) || isUndefined(req.body.password) || !isMobile(req.body.mobile) || !isPassword(req.body.password)) {
        return res.json({ message: 'INVALID_DATA' });
    } else {
        next();
    }
}

loginRouter.post('/', loginMiddleware, loginController.login)
module.exports = loginRouter