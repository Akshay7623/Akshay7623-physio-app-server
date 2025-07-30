const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session_key = process.env.SESSION_KEY;
const { UserModel } = require('../model/model')

const submitOTP = async (req, res) => {

    const { otp, mobile, password } = req.body;

    const user = await UserModel.findOne({ mobile: mobile });

    if (user) {

        const otp_id = user.otp_id;
        const otp_token = user.otp_token;
        const options = {
            method: 'GET',
            url: `https://cpaas.messagecentral.com/verification/v2/verification/validateOtp?countryCode=91&mobileNumber=${mobile}&verificationId=${otp_id}&customerId=C-6A5C1BAD37584F6&code=${otp}`,
            headers: {
                'authToken': otp_token
            }
        }

        axios(options).then(async (resp) => {
            if (resp.data.responseCode === 200) {
                const hashed_password = await bcrypt.hash(password, 10);
                const updateUser = await UserModel.updateOne({ mobile: mobile }, { password: hashed_password, verified: 1, otp_id: '', otp_token: '' })
                const _id = user._id.toString();
                const token = jwt.sign({ _id: _id }, session_key, { expiresIn: "15d" });
                res.json({ message: 'success', token: token })
            } else {
                res.json({ message: 'INVALID_OTP' })
            }

        }).catch(error => {
            res.json({ message: 'ERROR' })
        });
    } else {
        res.json({ message: 'USER_NOT_FOUND' })
    }
}

module.exports = { submitOTP }