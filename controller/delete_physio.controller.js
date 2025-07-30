const { PhysioModel } = require('../model/model')

const deletePhysio = async (req, res) => {
    await PhysioModel.deleteOne({ _id: req.body.id })
    res.json({ message: 'success' });
}

module.exports = { deletePhysio }