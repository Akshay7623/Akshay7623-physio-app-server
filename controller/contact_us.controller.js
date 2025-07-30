const { ContactsModel } = require('../model/model')


const ContactUs = async (req, res) => {

    const { full_name, mobile, email, message } = req.body;

    const created_at = new Date().getTime();
    const contact_data = ContactsModel({ full_name: full_name, mobile: mobile, email: email, message: message, created_at: created_at })
    await contact_data.save();
    res.json({ message: 'success' })
}

module.exports = { ContactUs }