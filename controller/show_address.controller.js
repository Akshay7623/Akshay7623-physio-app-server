const { AddressModel } = require('../model/model');

const showAddress = async (req, res) => {
    const addresses = await AddressModel.find({ user_id: req.body.userId });
    res.json({ addresses: addresses })
}

module.exports = { showAddress }