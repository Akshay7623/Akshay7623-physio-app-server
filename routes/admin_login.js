const express = require('express')
const adminLoginRouter = express.Router()
const adminLoginController = require('../controller/admin_login.controller.js');
const { isNull, isUndefined, isPassword } = require('../dataVerification.js');

const adminLoginMiddleware = (req, res, next) => {
    if (isNull(req.body.username) || isNull(req.body.password) || isUndefined(req.body.username) || isUndefined(req.body.password) || !isPassword(req.body.password)) {
        return res.json({ message: 'INVALID_DATA' });
    } else {
        next();
    }
}

adminLoginRouter.post('/', adminLoginMiddleware, adminLoginController.AdminLogin)
module.exports = adminLoginRouter