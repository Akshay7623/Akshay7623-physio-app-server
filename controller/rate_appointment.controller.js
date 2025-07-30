const { AppointmentModel } = require('../model/model')

const rateAppointment = async (req, res) => {
    const { rate, review, appointmentId } = req.body;

    if (rate >= 0 && rate >= 0) {
        const submit = await AppointmentModel.updateOne({ _id: appointmentId }, { appointment_rating: rate, review: review })
        res.json({ message: 'success' })
    } else {
        res.json({ message: 'INVALID_DATA' })
    }
}

module.exports = { rateAppointment }