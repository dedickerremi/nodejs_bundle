
const validation = require('./requirement-validator/authRequirement')
const authUtils = require('../middleware/authUtils')
const AuthController = require('../controllers/AuthController')
const fetchClientList = require('../middleware/controlClient')
const filter = require('../filter')

module.exports = function(app){
    app.post('/auth', validation.authValidation, filter(), fetchClientList.fetchClientList(), authUtils.prevalidation_auth(), AuthController.auth);
    app.post('/login', validation.loginValidation, filter(), fetchClientList.fetchClientList(), authUtils.updateRole(), AuthController.login);
};
