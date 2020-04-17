var express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/userModel');
const Msg = require('../constants/response');

exports.auth = function(filter = null) {
    return function(req, res, next) {
        var authHeader = req.headers['authorization'];
        if (!authHeader) return res.unauthorized('auth_header_required');
        var token = authHeader;
        jwt.verify(token, config.JwtSecret, function(err, decoded) {
            if (err) return res.unauthorized('Failed to authenticate token.');
            User.findById(decoded.id, function(err, user){
                if (err) return res.internalError(Msg.server.INTERNAL_ERROR);
                else if (!user) return res.unauthorized(Msg.user.USER_NOT_AUTHORIZED)
                else if (filter && filter.hasOwnProperty('admin') && filter.admin && user.hasOwnProperty('role') && user.role !== "admin"){
                    return res.unauthorized(Msg.user.USER_NOT_AUTHORIZED);
                }
                req.user = user;
                next();
            });
        });

    };
};

exports.prevalidation_auth = function() {
    return function(req, res, next) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.internalError(err);
            if (user) return res.forbidden(Msg.user.USER_ALREADY_EXIST);
            next();
        });
    }
};

exports.updateRole = function() {
    return function(req, res, next) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) return res.internalError(err);
            if(!user) {
                return res.badRequest("The username does not exist");
            } else if (user.role !==  req.body.role) {
                user.role = req.body.role;
                user.save((err) => {
                    if (err) return res.internalError(err);
                    next();
                });    
            } else 
                next();
        });
    }
};