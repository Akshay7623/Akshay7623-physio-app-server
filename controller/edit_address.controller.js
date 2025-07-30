const { AddressModel } = require('../model/model');

const editAddress = async (req, res) => {
    const { address_id, mobile, pincode, address, landmark } = req.body;
    await AddressModel.updateOne({ _id: address_id }, { mobile: mobile, pincode: pincode, address: address, landmark: landmark })
    res.json({ message: 'success' });
}

module.exports = { editAddress }