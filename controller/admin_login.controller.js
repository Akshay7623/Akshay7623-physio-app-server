const jwt = require('jsonwebtoken');
const admin_session_key = process.env.ADMIN_SESSION_KEY;
const admin_username = process.env.ADMIN_USERNAME;
const admin_password = process.env.ADMIN_PASSWORD;

const AdminLogin = async (req, res) => {

    const { username, password } = req.body;

    if (username === admin_username && password === admin_password) {

        const token = jwt.sign({ username: admin_username }, admin_session_key, { expiresIn: "5d" });
        res.json({ message: 'success', token: token });

    } else {
        res.json({ message: 'INVALID_CREDENTIAL' })
    }
}

module.exports = { AdminLogin }