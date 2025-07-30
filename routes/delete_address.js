const express = require('express')
const deleteAddressRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const deleteAddressController = require('../controller/delete_address.controller');
const { isNull, isUndefined, isValidtoken } = require('../dataVerification');

const deleteAddressMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);

    if (data) {
        req.body.userId = data._id;
        const { address_id } = req.body;
        if (isNull(address_id) || isUndefined(address_id)) {
            return res.json({ message: 'INVALID_DATA' });
        }
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

deleteAddressRouter.post('/', deleteAddressMiddleware, deleteAddressController.deleteAddress)
module.exports = deleteAddressRouter
