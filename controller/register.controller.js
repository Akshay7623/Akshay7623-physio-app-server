const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session_key = process.env.SESSION_KEY;
const { UserModel } = require('../model/model');

const register = async (req, res) => {

    const { mobile, password, name } = req.body;
    const findUser = await UserModel.findOne({ mobile: mobile });

    if (findUser) {
        const _id = findUser._id;
        const token = jwt.sign({ _id: _id }, session_key, { expiresIn: "15d" });
        return res.status(201).json({ message: 'success', token: token });
    }
    
    const time_now = new Date().getTime();
    const hashed_password = await bcrypt.hash(password, 10);
    const userData = UserModel({ mobile: mobile, first_name: name, last_name: '', password: hashed_password, created_at: time_now })
    const saveUser = await userData.save();
    const _id = saveUser._id;
    const token = jwt.sign({ _id: _id }, session_key, { expiresIn: "15d" });
    res.status(201).json({ message: 'success', token: token });
}


module.exports = { register }