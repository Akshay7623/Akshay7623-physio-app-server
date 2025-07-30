const express = require('express')
const getProfileRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const getProfileController = require('../controller/get_profile.controller.js');
const { isValidtoken } = require('../dataVerification.js');

const getProfileMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

getProfileRouter.get('/', getProfileMiddleware, getProfileController.getProfile)
module.exports = getProfileRouter