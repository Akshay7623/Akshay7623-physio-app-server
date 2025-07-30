const express = require('express')
const getAppointmentRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const getAppointmentController = require('../controller/get_appointment.controller.js');
const { isValidtoken } = require('../dataVerification.js');

const getAppointmentMiddleware = (req, res, next) => {
    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);
    if (data) {
        req.body.userId = data._id;
        req.body.page = req.params.page;
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

getAppointmentRouter.get('/:page', getAppointmentMiddleware, getAppointmentController.getAppointment)
module.exports = getAppointmentRouter