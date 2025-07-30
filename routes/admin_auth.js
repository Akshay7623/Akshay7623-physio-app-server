const express = require("express");
const jwt = require('jsonwebtoken');
const authAdminRoute = express.Router();
const admin_session_key = process.env.ADMIN_SESSION_KEY;

const { isNull, isUndefined } = require("../dataVerification");

const verifyData = (req, res) => {

    const Bearer = req.headers["authorization"];
    if (isUndefined(Bearer) || isNull(Bearer) || Bearer.trim() === '') {
        return res.json({ message: "AUTH_FAILED" });
    }

    const token = Bearer.split(" ")[1];
    jwt.verify(token, admin_session_key, (err, authData) => {
        if (err) {
            res.json({ message: "AUTH_FAILED" });
        } else {
            res.json({ message: 'success' });
        }
    })
}


authAdminRoute.get("/", verifyData);
module.exports = authAdminRoute;