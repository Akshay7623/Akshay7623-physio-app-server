const { UserModel } = require('../model/model');

const getUsers = async (req, res) => {
    const { page } = req.query
    const Users = await UserModel.find({ verified: 1 }).sort({ created_at: -1 }).skip((page - 1) * 10).limit(10);
    res.json({ Users })
}

module.exports = { getUsers }