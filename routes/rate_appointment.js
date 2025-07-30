const express = require('express')
const rateAppointmentRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const rateAppointmentController = require('../controller/rate_appointment.controller');
const { isValidtoken, isNull, isUndefined } = require('../dataVerification');

const rateAppointmentMiddleware = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);

    if (data) {
        const { rate, review, appointmentId } = req.body;
        req.body.userId = data._id;
        if (isNull(rate) || isUndefined(rate) || isNull(appointmentId) || isUndefined(appointmentId)) {
            return res.json({ message: 'INVALID_DATA' })
        }

        if (isNull(review) || isUndefined(review)) {
            req.body.review = '';
        }
        
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }

}

rateAppointmentRouter.post('/', rateAppointmentMiddleware, rateAppointmentController.rateAppointment)
module.exports = rateAppointmentRouter