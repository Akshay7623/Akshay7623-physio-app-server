const { AddressModel } = require('../model/model');
const getSingleAddress = async (req, res) => {

    const addressId = req.body.address_id;

    const address = await AddressModel.findOne({ _id: addressId });

    if (address) {
        res.json({ address: address })
    } else {
        res.json({ message: 'ADDRESS_NOT_FOUND' })
    }

}

module.exports = { getSingleAddress }