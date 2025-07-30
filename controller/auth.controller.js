const { UserModel } = require("../model/model");

const auth = async (req, res) => {
    const { _id } = req.body;

    const user = await UserModel.findOne({ _id: _id }, '-password');

    if (user) {
        res.json({ user });
    } else {
        res.json({ message: 'DATA_NOT_FOUND' })
    }
}

module.exports = { auth }