const { UserModel } = require('../model/model');


const updateProfile = async (req, res) => {

    const { userId, first_name, last_name, date_of_birth, gender } = req.body;

    let date_of_b = Date.parse(date_of_birth);

    const get_user = await UserModel.findOne({ _id: userId });

    if (get_user) {
        const updateUser = await UserModel.updateOne({ _id: userId }, { first_name: first_name, last_name: last_name, date_of_birth: date_of_b, gender: gender })
        res.json({ message: 'success' });
    } else {
        res.json({ message: 'USER_NOT_FOUND' });
    }
}

module.exports = { updateProfile }