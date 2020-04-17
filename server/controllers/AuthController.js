const Msg = require('../constants/response')
const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const config = require('../config')

const auth = (req, res) => {
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
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            user.comparePassword(req.body.password, (error, match) => {
                    if(!match) {
                        return res.badRequest({ message: "The password is invalid" });
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
        res.internalError(error);
    }
}

module.exports = {
    auth: auth,
    login: login
}