const express = require('express')
const addAddressRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const addAddressController = require('../controller/add_address.controller')
const { isValidtoken, isNull, isUndefined, isMobile, isPincode } = require('../dataVerification.js');

const addAddressMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        const { mobile, pincode, address } = req.body;
        if (isNull(mobile) || isUndefined(mobile) || isNull(pincode) || isUndefined(pincode) || isNull(address) || isUndefined(address) || !isMobile(mobile) || !isPincode(pincode)) {
            return res.json({ message: 'INVALID_DATA' })
        }
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

addAddressRouter.post('/', addAddressMiddleware, addAddressController.addAddress)
module.exports = addAddressRouter