const axios = require('axios')
const bcrypt = require('bcrypt')
const { UserModel } = require('../model/model')
const { isNull, isUndefined, isPassword } = require('../dataVerification')

const submitOTP = async (req, res) => {

    const { userId, otp, mobile, new_password } = req.body;
    const user = await UserModel.findOne({ _id: userId });

    if (user) {
        const old_mobile = user.mobile;
        const { otp_id, otp_token } = user;
        let old_mobile_exist = true;

        if (isUndefined(old_mobile) || isNull(old_mobile) || old_mobile === '') {
            old_mobile_exist = false;
            if (isUndefined(new_password) || isNull(new_password) || !isPassword(new_password)) {
                return res.json({ message: 'INVALID_DATA' })
            }
        }

        const options = {
            method: 'GET',
            url: `https://cpaas.messagecentral.com/verification/v2/verification/validateOtp?countryCode=91&mobileNumber=${mobile}&verificationId=${otp_id}&customerId=C-6A5C1BAD37584F6&code=${otp}`,
            headers: {
                'authToken': otp_token
            }
        }

        axios(options).then(async (resp) => {
            if (resp.data.responseCode === 200) {
                if (old_mobile_exist) {
                    const updateUser = await UserModel.updateOne({ _id: userId }, { mobile: mobile, otp_id: '', otp_token: '', verified: 1 });
                } else {
                    const hashed_password = await bcrypt.hash(new_password, 10);
                    const updateUser = await UserModel.updateOne({ _id: userId }, { mobile: mobile, otp_id: '', otp_token: '', verified: 1, password: hashed_password });
                }
                res.json({ message: 'success' })
            } else {
                res.json({ message: 'INVALID_OTP' })
            }
        }).catch(error => {
            res.json({ message: 'ERROR' })
        })
    } else {
        res.json({ message: 'USER_NOT_EXIST' })
    }
}

module.exports = { submitOTP }