const { OAuth2Client } = require('google-auth-library');

const changeMail = async (req, res) => {

    const { userId } = req.body;

    res.header("Access-Control-Allow-Origin", process.env.DOMAIN_WITH_PROTOCOL);
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const redirectURL = 'http://localhost:3000/api/add_email_auth';

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

    res.json({ url: authorizeUrl, userId: userId })
}

module.exports = { changeMail }