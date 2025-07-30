const express = require('express')
const registerRouter = express.Router()
const registerController = require('../controller/register.controller.js');
const axios = require('axios')
const { isNull, isUndefined } = require('../dataVerification.js');

const registerMiddleware = async (req, res, next) => {

    const { token, name, password } = req.body;

    if (isNull(token) || isUndefined(token) || isNull(name) || isUndefined(name) || isNull(password) || isUndefined(password)) {
        return res.json({ message: 'INVALID_DATA' });
    }

    const postData = {
        authkey: process.env.MSG_AUTH_KEY,
        'access-token': token
    }

    const response = await axios.post('https://control.msg91.com/api/v5/widget/verifyAccessToken', postData, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const responseData = response.data;

    if (responseData.type === 'success') {
        const mobile = responseData.message.slice(2)
        req.body.mobile = mobile;
        next();
    } else {
        res.json({ message: 'SERVER_ERROR' })
    }

}

registerRouter.post('/', registerMiddleware, registerController.register)
module.exports = registerRouter