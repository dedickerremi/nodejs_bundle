
const validation = require('./requirement-validator/authRequirement')
const authUtils = require('../middleware/authUtils')
const AuthController = require('../controllers/AuthController')

module.exports = function(app){
    app.post('/auth', validation.authValidation, authUtils.prevalidation_auth(), AuthController.auth);
    app.post('/login', validation.loginValidation, AuthController.login);
};
