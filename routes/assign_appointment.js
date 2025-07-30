const express = require("express");
const jwt = require('jsonwebtoken');
const Router = express.Router();
const admin_session_key = process.env.ADMIN_SESSION_KEY;
const Controller = require('../controller/assign_appointment.controller.js')
const { isNull, isUndefined } = require("../dataVerification");

const middleware = (req, res, next) => {

    const {  appointmentId, physioId } = req.body;

    const Bearer = req.headers["authorization"];

    if (isNull(appointmentId) || isUndefined(appointmentId) || isNull(physioId) || isUndefined(physioId)) {
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

Router.post("/", middleware, Controller.Assign);
module.exports = Router;