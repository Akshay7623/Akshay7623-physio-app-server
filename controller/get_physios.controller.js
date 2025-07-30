const { PhysioModel } = require('../model/model');

const getPhysios = async (req, res) => {

    const physios = await PhysioModel.find({});
    res.json({ physios })
}

module.exports = { getPhysios }