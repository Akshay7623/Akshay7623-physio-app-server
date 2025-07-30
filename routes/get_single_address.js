const express = require('express')
const getSingleAddressRouter = express.Router()
const getSingleAddressController = require('../controller/get_single_address.controller.js');
const { isValidtoken, isNull, isUndefined } = require('../dataVerification.js');
const session_key = process.env.SESSION_KEY;

const getProfileMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        if (isNull(req.body.address_id) || isUndefined(req.body.address_id)) {
            return res.json({ message: 'INVALID_ID' });
        }
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

getSingleAddressRouter.post('/', getProfileMiddleware, getSingleAddressController.getSingleAddress)
module.exports = getSingleAddressRouter