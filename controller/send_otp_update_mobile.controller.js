const axios = require('axios');
const { UserModel } = require('../model/model')

const sendOTP = async (req, res) => {

    const { mobile, userId } = req.body;

    const generate_token_option = {
        method: 'GET',
        url: `https://cpaas.messagecentral.com/auth/v1/authentication/token?country=IN&customerId=C-6A5C1BAD37584F6&email=merakki123@gmail.com&key=QWtzaGF5QDEyMw==&scope=NEW`,
        headers: {
            'Accept': '*/*'
        }
    }

    const user = await UserModel.findOne({ _id: userId });

    axios(generate_token_option).then(response => {

        if (response.data.status === 200) {

            const opt = {
                method: 'POST',
                url: `https://cpaas.messagecentral.com/verification/v2/verification/send?countryCode=91&customerId=C-6A5C1BAD37584F6&flowType=SMS&mobileNumber=${mobile}`,
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': response.data.token
                }
            }

            axios(opt).then(async (resp) => {
                if (resp.data.responseCode === 200) {
                    const updated_at = new Date().getTime();
                    const new_user = await UserModel.updateOne({ _id: userId }, { updated_at: updated_at, otp_id: resp.data.data.verificationId, otp_token: response.data.token });
                    res.json({ message: 'success' });
                } else if (resp.data.responseCode === 506) {
                    const time_now = new Date().getTime();
                    const updated_at = user.updated_at;
                    res.json({ message: 'REQUEST_ALREADY_EXISTS', time_passed: (time_now - updated_at) / 1000 })
                } else {
                    res.json({ message: 'FAILED_TO_SEND_OTP' });
                }
            })
        } else {
            res.json({ message: 'UNABLE_TO_VERIFY' })
        }
    })
}

module.exports = { sendOTP }