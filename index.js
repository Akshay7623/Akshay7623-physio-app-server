require('dotenv').config();
require('./dbconfig')
const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000
const app = express()

const requestRouter = require('./routes/request')
const authRouter = require('./routes/oauth')
const addMailAuthRouter = require('./routes/add_mail_auth')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const authUserRouter = require('./routes/auth_user')
const sendOTPRouter = require('./routes/send_otp')
const submitOTPRouter =require('./routes/submit_otp')
const resetPassOTPRouter = require('./routes/resetPassOTP')

const updateProfileRouter = require('./routes/update_profile')
const sendOTPUpdateMobileRouter = require('./routes/send_otp_update_mobile')
const submitOTPUpdateMobileRouter = require('./routes/submit_otp_update_mobile');
const bookAppointmentRouter = require('./routes/book_appointment')
const getAppointmentRouter = require('./routes/get_appointment')
const resetPasswordRouter = require('./routes/reset_password')
const changeMailRouter = require('./routes/changeMailRouter')
const ContactUsRouter = require('./routes/contact_us')

const showAddressesRouter = require('./routes/show_addresses')
const editAddressRouter = require('./routes/edit_address')
const deleteAddressRouter = require('./routes/delete_address')

const rateAppointmentRouter = require('./routes/rate_appointment')
const getProfileRouter = require('./routes/get_profile')
const addAddressRouter = require('./routes/add_address')
const getSingleAddressRouter = require('./routes/get_single_address')
const changePasswordRouter = require('./routes/change_password');

const adminLoginRouter = require('./routes/admin_login');
const adminAuthRouter = require('./routes/admin_auth');
const getUsersRouter = require('./routes/get_users')
const getAppointmentAdminRoute = require('./routes/get_admin_appointments')
const AddPhysioRouter = require('./routes/add_physio');
const GetAllPhysioRouter = require('./routes/get_all_physio');
const DeletePhysioRouter = require('./routes/delete_physio');
const UpdatePhysioRouter =  require('./routes/update_physio')
const AssignAppointmentRouter = require('./routes/assign_appointment');

app.use(cookieParser());
app.use(express.json())
app.use(cors())

{/* API endpoints*/ }

app.use('/google/request', requestRouter)
app.use('/oauth', authRouter)

app.use('/api/add_email_auth', addMailAuthRouter)
app.use('/api/change_email',changeMailRouter)

app.use('/api/register', registerRouter)
app.use('/api/send_otp', sendOTPRouter)
app.use('/api/submit_otp',submitOTPRouter)
app.use('/api/login', loginRouter)
app.use('/api/auth_user', authUserRouter)
app.use('/api/change_password', changePasswordRouter)
app.use('/api/reset_pass_otp',resetPassOTPRouter)
app.use('/api/reset_password',resetPasswordRouter)

app.use('/api/get_profile', getProfileRouter)
app.use('/api/update_profile', updateProfileRouter)
app.use('/api/send_otp_update_mobile', sendOTPUpdateMobileRouter)
app.use('/api/submit_otp_update_mobile',submitOTPUpdateMobileRouter)

app.use('/api/book_appointment', bookAppointmentRouter)
app.use('/api/get_appointment_history', getAppointmentRouter)
app.use('/api/contact_us',ContactUsRouter)

{/* addresses apis */ }

app.use('/api/get_saved_addresses', showAddressesRouter)
app.use('/api/get_single_address', getSingleAddressRouter)
app.use('/api/add_address', addAddressRouter);
app.use('/api/delete_address', deleteAddressRouter)
app.use('/api/edit_address', editAddressRouter)
app.use('/api/submit_review', rateAppointmentRouter)

{/* admin api endpoints */ }

app.use('/api/admin/login', adminLoginRouter);
app.use('/api/admin/auth_admin', adminAuthRouter);
app.use('/api/admin/get_users',getUsersRouter);
app.use('/api/get_appointments',getAppointmentAdminRoute)
app.use('/api/add_physio',AddPhysioRouter)
app.use('/api/get_all_physio',GetAllPhysioRouter)
app.use('/api/delete_physio',DeletePhysioRouter)
app.use('/api/update_physio',UpdatePhysioRouter)
app.use('/api/assign_appointment',AssignAppointmentRouter)


app.use(express.static(__dirname + '/dist'));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server is Running on http://localhost:${PORT}`))