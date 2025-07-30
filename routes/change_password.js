const express = require('express')
const changePasswordRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const changePasswordController = require('../controller/change_password.controller');
const { isValidtoken, isNull, isUndefined, isPassword } = require('../dataVerification.js');

const changePasswordMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        if (isNull(req.body.old_password) || isUndefined(req.body.old_password) || isNull(req.body.new_password) || isUndefined(req.body.new_password) || !isPassword(req.body.new_password) || !isPassword(req.body.new_password)) {
            return res.json({ message: 'INVALID_DATA' });
        }
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

changePasswordRouter.post('/', changePasswordMiddleware, changePasswordController.changPassword)
module.exports = changePasswordRouter