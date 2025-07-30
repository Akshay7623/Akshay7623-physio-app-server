const express = require('express')
const bookAppointmentRouter = express.Router()
const session_key = process.env.SESSION_KEY;
const bookAppointmentController = require('../controller/book_appointment.controller');
const { isValidtoken, isNull, isUndefined, isMobile, isPincode } = require('../dataVerification');

const bookAppointmentMiddleware = (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);

    if (data) {
        req.body.userId = data._id;
        const { patinentName, mobile, pincode, address, date, therapy, time } = req.body;

        if (isNull(patinentName) || isUndefined(patinentName) || isNull(mobile) || isUndefined(mobile) || isNull(pincode) || isUndefined(pincode) || isNull(address) || isUndefined(address) || isNull(date) || isUndefined(date) || isNull(therapy) || isUndefined(therapy) || isNull(time) || isUndefined(time) || !isMobile(mobile) || !isPincode(pincode)) {
            return res.json({ message: 'INVALID_DATA' });
        } else {

            let date_time_in_millisecond;
            let am_or_pm = time.split(" ")[1];
            let clock_time_hour = parseInt(time.split(" ")[0].split(":")[0]);
            let clock_time_min = parseInt(time.split(" ")[0].split(":")[1]);

            if (am_or_pm === 'AM') {
                date_time_in_millisecond = Date.parse(date) + (clock_time_hour * 3600000) + (clock_time_min * 60000);
                req.body.date_time = date_time_in_millisecond;
            } else {
                date_time_in_millisecond = Date.parse(date) + (clock_time_hour * 3600000) + (clock_time_min * 60000) + 43200000;
                req.body.date_time = date_time_in_millisecond;
            }

            if ((date_time_in_millisecond - new Date().getTime()) < 18000000) {
                return res.json({ message: '5_HOUR_ERROR' });
            }

            if (am_or_pm === 'AM') {
                if (clock_time_hour >= 9 && clock_time_hour <= 11) {
                } else {
                    return res.json({ message: 'TIME_RANGE_ERROR' })
                }
            } else {
                if (clock_time_hour === 12 || (clock_time_hour >= 1 && clock_time_hour <= 8)) {
                } else {
                    return res.json({ message: 'TIME_RANGE_ERROR' })
                }
            }

            next();
        }
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }

}

bookAppointmentRouter.post('/', bookAppointmentMiddleware, bookAppointmentController.bookAppointment)
module.exports = bookAppointmentRouter