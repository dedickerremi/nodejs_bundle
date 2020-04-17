const API = require('../API')
const _ = require('lodash')

exports.fetchClientList = function() {
    return function(req, res, next) {
        API.fetchClientList()
        .then( data => {
            let result = _.filter(data.data["clients"], ['email', req.body.email])
            if (result.length >= 1) {
                result = result.shift();
                req.body.role = result.role
                req.body.clientId = result.id
            }
            next();
        })
        .catch(err => next(err))
    };
};