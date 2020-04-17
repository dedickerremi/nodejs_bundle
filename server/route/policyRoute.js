const policyController = require('../controllers/policyController')
const authUtils = require('../middleware/authMiddleware')

const filter = {admin: true}

module.exports = function(app){
    app.get('/policies', authUtils.auth(filter) ,policyController.getPolicies);    
    app.get('/policies/id/:slug', authUtils.auth(filter) ,policyController.policyById);
    app.get('/policies/email/:slug', authUtils.auth(filter) ,policyController.policiesByEmail);
};
