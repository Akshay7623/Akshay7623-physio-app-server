var express = require('express');
var router = express.Router();

const { OAuth2Client } = require('google-auth-library');

router.post('/', async function (req, res, next) {

    
    res.header("Access-Control-Allow-Origin", process.env.DOMAIN_WITH_PROTOCOL);
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const redirectURL = 'https://akshay.up.railway.app/oauth';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid email',
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl })

});

module.exports = router;
