const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session_key = process.env.SESSION_KEY;
const { UserModel } = require('../model/model')

const login = async (req, res) => {

    const { mobile, password } = req.body;

    const user = await UserModel.findOne({ $and: [{ mobile: mobile }, { verified: 1 }] });

    if (user) {
        const hashedPass = user.password;
        bcrypt.compare(password, hashedPass, function (err, result) {
            if (result) {
                const _id = user._id;
                const token = jwt.sign({ _id }, session_key, { expiresIn: "15d" });
                res.json({ message: 'VERIFIED', token: token });
            } else {
                res.json({ message: 'INVALID_DATA' });
            }
        })
    } else {
        return res.json({ message: 'USER_NOT_FOUND' });
    }

}

module.exports = { login }