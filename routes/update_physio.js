const express = require("express");
const jwt = require('jsonwebtoken');
const Router = express.Router();
const admin_session_key = process.env.ADMIN_SESSION_KEY;
const Controller = require('../controller/update_physio.controller.js')
const { isNull, isUndefined, isMobile } = require("../dataVerification");

const middleware = (req, res, next) => {

    const { id, name, mobile, password } = req.body;

    const Bearer = req.headers["authorization"];

    if (isNull(id) || isUndefined(id) || isNull(name) || isUndefined(name) || isNull(mobile) || isUndefined(mobile) || isNull(password) || isUndefined(mobile) || !isMobile(mobile)) {
        return res.json({ message: 'INVALID_DATA' })
    }

    if (isUndefined(Bearer) || isNull(Bearer) || Bearer.trim() === '') {
        return res.json({ message: "AUTH_FAILED" });
    }

    const token = Bearer.split(" ")[1];
    jwt.verify(token, admin_session_key, (err, authData) => {
        if (err) {
            res.json({ message: "AUTH_FAILED" });
        } else {
            next();
        }
    })
}

Router.post("/", middleware, Controller.updatePhysio);
module.exports = Router;