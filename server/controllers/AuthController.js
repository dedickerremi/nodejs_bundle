const Msg = require('../constants/msgError')
const User = require('../model/userModel')
const { validationResult } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const config = require('../config')

const auth = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        var user = new User(req.body);
        user.save(function(err){
            if (err) return res.internalError(err);
        });
        return res.ok(Msg.user.USER_CREATED)
    } catch (error) {
        return res.status(500).send(Msg.server.INTERNAL_ERROR);
    }
}

const login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if(!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(req.body.password, (error, match) => {
                if(!match) {
                    return res.status(400).send({ message: "The password is invalid" });
                }
            });
            var token = jwt.sign({ id: user._id }, config.JwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            user.password = null;
            user._id = null;
            res.ok({user: user, token: token });
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    auth: auth,
    login: login
}