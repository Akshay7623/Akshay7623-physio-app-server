const express = require('express')
const showAddressesRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const showAddressesController = require('../controller/show_address.controller.js')
const { isValidtoken } = require('../dataVerification.js');

const showAddressMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

showAddressesRouter.get('/', showAddressMiddleware, showAddressesController.showAddress)
module.exports = showAddressesRouter