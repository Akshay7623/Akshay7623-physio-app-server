const { AddressModel } = require('../model/model');

const addAddress = async (req, res) => {
    const { userId, mobile, pincode, address, landmark } = req.body;
    const new_address = AddressModel({ user_id: userId, mobile: mobile, pincode: pincode, address: address, landmark: landmark })
    const save_addr = await new_address.save();
    if (save_addr) {
        res.json({ message: 'success' });
    } else {
        res.json({ message: 'SOME_SERVER_ERROR' })
    }
}

module.exports = { addAddress }