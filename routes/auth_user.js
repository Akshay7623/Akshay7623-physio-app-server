const express = require("express");
const jwt = require('jsonwebtoken');
const authuserController = require('../controller/auth.controller.js')
const session_key = process.env.SESSION_KEY;
const authuserRoute = express.Router();

const { isNull, isUndefined } = require("../dataVerification");

const verifyData = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    if (isUndefined(Bearer) || isNull(Bearer) || Bearer.trim() === '') {
        return res.json({ message: "AUTH_FAILED" });
    }

    const token = Bearer.split(" ")[1];
    jwt.verify(token, session_key, (err, authData) => {
        if (err) {
            res.json({ message: "AUTH_FAILED" });
        } else {
            req.body._id = authData._id;
            next();
        }
    });
}


authuserRoute.post("/", verifyData, authuserController.auth);
module.exports = authuserRoute;