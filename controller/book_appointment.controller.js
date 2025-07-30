const { AppointmentModel, AddressModel } = require('../model/model');

const bookAppointment = async (req, res) => {

    const { userId, patinentName, mobile, pincode, address, landmark, date, therapy, time, date_time } = req.body;
    const getaddress = await AddressModel.findOne({ user_id: userId })

    if (getaddress) {
        const appointment = AppointmentModel({ user_id: userId, patinent_name: patinentName, mobile: mobile, pincode: pincode, address: address, landmark: landmark, appointment_date: Date.parse(date), appointment_time: time, appointment_status: 'UPCOMING', therapy: therapy, date_time: date_time })
        await appointment.save();
    } else {
        const appointment = AppointmentModel({ user_id: userId, patinent_name: patinentName, mobile: mobile, pincode: pincode, address: address, landmark: landmark, appointment_date: Date.parse(date), appointment_time: time, appointment_status: 'UPCOMING', therapy: therapy, date_time: date_time })
        await appointment.save();
        const new_address = AddressModel({
            user_id: userId,
            mobile: mobile,
            pincode: pincode,
            address: address,
            landmark: landmark
        })
        await new_address.save();
    }
    
    res.json({ message: 'success' });
}

module.exports = { bookAppointment }