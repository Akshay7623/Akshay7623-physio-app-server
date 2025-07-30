const { UserModel } = require("../model/model");


const getProfile = async (req, res) => {

    const { userId } = req.body;
    const user = await UserModel.findOne({ _id: userId }, '-password')

    if (user) {
        res.json({ message: 'success', user: user })
    } else {
        res.json({ message: 'INVALID_TOKEN' })
    }

}

module.exports = { getProfile }