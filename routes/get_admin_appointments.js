const express = require("express");
const jwt = require('jsonwebtoken');
const Router = express.Router();
const admin_session_key = process.env.ADMIN_SESSION_KEY;
const Controller = require('../controller/get_admin_appointment.controller.js')
const { isNull, isUndefined } = require("../dataVerification");

const middleware = (req, res, next) => {

    const Bearer = req.headers["authorization"];

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

Router.get("/", middleware, Controller.getAppointments);
module.exports = Router;