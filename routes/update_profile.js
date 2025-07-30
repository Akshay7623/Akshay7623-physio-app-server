const express = require('express')
const updateProfileRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const updateProfileController = require('../controller/update_profile.controller');
const { isNull, isUndefined, isValidtoken } = require('../dataVerification');

const updateProfileMiddleware = (req, res, next) => {
    const { first_name, last_name, date_of_birth, gender } = req.body;

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);

    if (data) {
        req.body.userId = data._id;
        if (!['male', 'female'].includes(gender) || isNull(first_name) || isUndefined(first_name) || isNull(last_name) || isUndefined(last_name) || isNull(date_of_birth) || isUndefined(date_of_birth)) {
            return res.json({ message: 'INVALID_DATA' })
        } else {
            next();
        }
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}



updateProfileRouter.post('/', updateProfileMiddleware, updateProfileController.updateProfile)
module.exports = updateProfileRouter