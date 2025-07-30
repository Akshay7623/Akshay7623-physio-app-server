const express = require('express')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const router = express.Router()
const session_key = process.env.SESSION_KEY
const { UserModel } = require('../model/model')


router.get('/', async function (req, res, next) {

    const code = req.query.code;

    try {
        const redirectURL = "http://localhost:3000/oauth"

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
                const _id = getUser._id.toString();
                const token = jwt.sign({ _id: _id }, session_key, { expiresIn: "15d" });
                return res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/google_auth/${token}`);
            }

            const first_name = data.family_name;
            const last_name = data.given_name;
            const created_at = new Date().getTime()
            const user_data = UserModel({ first_name: first_name, last_name: last_name, email: email, created_at: created_at })
            const save_user = await user_data.save()
            const _id = save_user._id.toString()
            const token = jwt.sign({ _id: _id }, session_key, { expiresIn: "15d" })
            res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/google_auth/${token}`)

        } else {
            res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/404`)
        }

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err)
        res.redirect(303, `${process.env.DOMAIN_WITH_PROTOCOL}/404`)
    }



});

module.exports = router;
