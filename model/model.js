const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    mobile: String,
    email: String,
    first_name: String,
    last_name: String,
    password: String,
    created_at: Number,
    updated_at: Number,
    date_of_birth: Number,
    gender: String,
    verified: Number,
    otp_id: String,
    otp_token: String
})

const AddressSchema = new mongoose.Schema({
    user_id: String,
    mobile: String,
    pincode: Number,
    address: String,
    landmark: String
})

const AppointmentSchema = new mongoose.Schema({
    user_id: String,
    patinent_name: String,
    address: String,
    landmark: String,
    mobile: String,
    therapy: String,
    pincode: Number,
    date_time: Number,
    appointment_status: String,
    appointment_date: String,
    appointment_time: String,
    appointment_rating: Number,
    assigned: {
        type: Boolean,
        default: false
    },
    assigned_to:String,
});

const ContactUsSchema = new mongoose.Schema({
    full_name: String,
    mobile: String,
    email: String,
    message: String,
    created_at: String,
});

const PhysioSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    total_appointments: {
        type: Number,
        default: 0
    },
});


const UserModel = new mongoose.model('users', UserSchema)
const AddressModel = new mongoose.model('addresses', AddressSchema)
const AppointmentModel = new mongoose.model('appointments', AppointmentSchema)
const ContactsModel = new mongoose.model('contacts', ContactUsSchema)
const PhysioModel = new mongoose.model('physios', PhysioSchema)

module.exports = { UserModel, AddressModel, AppointmentModel, ContactsModel, PhysioModel }