const { AppointmentModel, PhysioModel } = require('../model/model');

const Assign = async (req, res) => {

    const { appointmentId, physioId } = req.body;

    const appointment = await AppointmentModel.findOne({ _id: appointmentId });
    const physio = await PhysioModel.findOne({ _id: physioId });

    if (appointment && physio) {
        await AppointmentModel.updateOne({ _id: appointment }, { assigned: true, assigned_to: physio.name })
        res.json({ message: 'success' })
    } else {
        res.json({ message: 'INVALID_DATA' })
    }

}

module.exports = { Assign }