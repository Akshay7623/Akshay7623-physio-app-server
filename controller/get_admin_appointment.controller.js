const { AppointmentModel } = require('../model/model');

const getAppointments = async (req, res) => {
    const { page, appointment_type } = req.query
    const assigned = req.query.assigned;

    let Appointments, totaldocs;

    if (assigned === 'true') {
        Appointments = await AppointmentModel.find({ $and: [{ appointment_status: 'UPCOMING' }, { assigned: true }] }).sort({ date_time: 1 }).skip((page - 1) * 10).limit(10);
        totaldocs = await AppointmentModel.find({ $and: [{ appointment_status: 'UPCOMING' }, { assigned: true }] }).count();
        return res.json({ Appointments, totaldocs: totaldocs })
    } else if (assigned === "false") {
        Appointments = await AppointmentModel.find({ $and: [{ appointment_status: 'UPCOMING' }, { assigned: false }] }).sort({ date_time: 1 }).skip((page - 1) * 10).limit(10);
        totaldocs = await AppointmentModel.find({ $and: [{ appointment_status: 'UPCOMING' }, { assigned: false }] }).count();
        return res.json({ Appointments, totaldocs: totaldocs })
    }

    switch (appointment_type) {
        case 'all':
            Appointments = await AppointmentModel.find({}).sort({ date_time: 1 }).skip((page - 1) * 10).limit(10);
            totaldocs = await AppointmentModel.find({}).count();
            res.json({ Appointments, totaldocs: totaldocs })
            break;
        case 'upcoming':
            Appointments = await AppointmentModel.find({ appointment_status: 'UPCOMING' }).sort({ date_time: 1 }).skip((page - 1) * 10).limit(10);
            totaldocs = await AppointmentModel.find({ appointment_status: 'UPCOMING' }).count();
            res.json({ Appointments, totaldocs: totaldocs })
            break;
        case 'completed':
            Appointments = await AppointmentModel.find({ appointment_status: 'COMPLETED' }).sort({ date_time: 1 }).skip((page - 1) * 10).limit(10);
            totaldocs = await AppointmentModel.find({ appointment_status: 'COMPLETED' }).count();
            res.json({ Appointments, totaldocs: totaldocs })
            break;
        default:
            res.json({ message: 'INVALID_PARAMETER' });
    }
}

module.exports = { getAppointments }