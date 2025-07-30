const { AddressModel } = require('../model/model');

const deleteAddress = async (req, res) => {
    const { address_id } = req.body;
    const deleteAddress = await AddressModel.deleteOne({ _id: address_id });
    res.json({ message: 'success' });
}

module.exports = { deleteAddress }