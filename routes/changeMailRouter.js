const express = require("express");
const Router = express.Router();
const session_key = process.env.SESSION_KEY;
const Controller = require('../controller/change_mail.controller.js')
const { isValidtoken } = require("../dataVerification");

const middleware = async (req, res, next) => {

    const Bearer = req.headers["authorization"];
    const data = isValidtoken(Bearer, session_key);

    if (data) {
        req.body.userId = data._id;
        next();
    } else {
        res.json({ message: 'AUTH_FAILED' });
    }
}

Router.post("/", middleware, Controller.changeMail);
module.exports = Router;