const { AppointmentModel } = require('../model/model');

const getAppointment = async (req, res) => {
    const { userId, page } = req.body;
    const Appointments = await AppointmentModel.find({ user_id: userId }).sort({ date_time: -1 }).skip((page - 1) * 10).limit(10);
    res.json({ Appointments })
}

module.exports = { getAppointment }