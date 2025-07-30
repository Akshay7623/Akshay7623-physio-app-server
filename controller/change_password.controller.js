const bcrypt = require('bcrypt');
const { UserModel } = require('../model/model')

const changPassword = async (req, res) => {

    const { userId, old_password, new_password } = req.body;

    const user = await UserModel.findOne({ _id: userId });

    if (user) {
        const hashedPass = user.password;
        bcrypt.compare(old_password, hashedPass, async function (err, result) {
            if (result) {
                const new_hashed_password = await bcrypt.hash(new_password, 10);
                await UserModel.updateOne({ _id: userId }, { password: new_hashed_password });
                res.json({ message: 'success' });
            } else {
                res.json({ message: 'WRONG_PASSWORD' });
            }
        })
    } else {
        return res.json({ message: 'USER_NOT_FOUND' });
    }

}

module.exports = { changPassword }