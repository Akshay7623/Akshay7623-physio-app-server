const bcrypt = require('bcrypt');
const { PhysioModel } = require('../model/model')

const addPhysio = async (req, res) => {
    
    const hashed_password = await bcrypt.hash(req.body.password, 10);
    const data = PhysioModel({ name: req.body.name, mobile: req.body.mobile, password: hashed_password })
    await data.save()
    res.json({ message: 'success' })
}

module.exports = { addPhysio }