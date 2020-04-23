
const validation = require('./requirement-validator/authRequirement')
const authUtils = require('../middleware/authMiddleware')
const authController = require('../controllers/authController')
const fetchClientList = require('../middleware/controlUserMiddleware')
const filter = require('../filter')

module.exports = function(app){
    app.post('/auth', validation.authValidation, filter(), fetchClientList.fetchClientList(), authUtils.prevalidation_auth(), authController.auth);
    app.post('/login', validation.loginValidation, filter(), fetchClientList.fetchClientList(), authUtils.updateRole(), authController.login);
};
