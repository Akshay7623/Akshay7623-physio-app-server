const express = require('express')
const editAddressRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const editAddressController = require('../controller/edit_address.controller');
const { isValidtoken, isNull, isUndefined, isMobile, isPincode } = require('../dataVerification');

const editAddressMiddleware = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        const { mobile, pincode, address, address_id } = req.body;
        if (isNull(mobile) || isUndefined(mobile) || isNull(pincode) || isUndefined(pincode) || isNull(address) || isUndefined(address) || !isMobile(mobile) || !isPincode(pincode) || isNull(address_id) || isUndefined(address_id)) {
            return res.json({ message: 'INVALID_DATA' })
        }
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

editAddressRouter.post('/', editAddressMiddleware, editAddressController.editAddress)
module.exports = editAddressRouter