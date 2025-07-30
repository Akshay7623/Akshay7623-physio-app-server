const express = require('express')
const { OAuth2Client } = require('google-auth-library')
const router = express.Router()
const { UserModel } = require('../model/model')
const { isNull, isUndefined } = require('../dataVerification')

router.get('/', async function (req, res, next) {

    const userId = req.cookies.userId;
    const code = req.query?.code;

    if (isNull(userId) || isUndefined(userId) || isNull(code) || isUndefined(code)) {
        return res.json({ message: 'INVALID_DATA' });
    }

    try {

        const redirectURL = "http://localhost:3000/api/add_email_auth"
        const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, redirectURL);
        const r = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        const user = oAuth2Client.credentials;
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${oAuth2Client.credentials.access_token}`);
        const data = await response.json();

        if (data.email_verified) {

            const email = data.email;
            const getUser = await UserModel.findOne({ email: email });

            if (getUser) {
                res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/close_page`)
            } else {
                const addEmail = await UserModel.updateOne({ _id: userId }, { email: email });
                res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/close_page`)
            }

        } else {
            res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/404`)
        }

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err)
        res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/404`)
    }
});

module.exports = router;
