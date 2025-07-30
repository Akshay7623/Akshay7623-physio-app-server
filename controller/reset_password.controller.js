const axios = require('axios')
const bcrypt = require('bcrypt')
const { UserModel } = require('../model/model');
const resetPassword = async (req, res) => {

    const { mobile, otp, new_password, otp_id, otp_token } = req.body;

    const options = {
        method: 'GET',
        url: `https://cpaas.messagecentral.com/verification/v2/verification/validateOtp?countryCode=91&mobileNumber=${mobile}&verificationId=${otp_id}&customerId=C-6A5C1BAD37584F6&code=${otp}`,
        headers: {
            'authToken': otp_token
        }
    }

    axios(options).then(async (resp) => {
        if (resp.data.responseCode === 200) {
            const hashed_password = await bcrypt.hash(new_password, 10);
            const updatePassword = await UserModel.updateOne({ mobile: mobile }, { password: hashed_password });
            res.json({ message: 'success' });
        } else {
            res.json({ message: 'INVALID_OTP' })
        }
    }).catch(error => {
        res.json({ message: 'ERROR' })
    })

}


module.exports = { resetPassword };