const bcrypt = require('bcrypt')
const { PhysioModel } = require('../model/model');
const e = require('express');

const updatePhysio = async (req, res) => {
    const { id, name, mobile, password } = req.body;

    if (password.length >= 6) {
        const hashed_password = await bcrypt.hash(password, 10)
        await PhysioModel.updateOne({ _id: id }, { name: name, mobile: mobile, password: hashed_password })
    } else {
        const hashed_password = await bcrypt.hash(password, 10)
        await PhysioModel.updateOne({ _id: id }, { name: name, mobile: mobile })
    }

    res.json({ message: "success" })
}

module.exports = { updatePhysio }