const userController = require('../controllers/userController')
const authUtils = require('../middleware/authMiddleware')

module.exports = function(app){
    app.get('/users', authUtils.auth(), userController.getUsers)
    app.get('/user/id/:slug', authUtils.auth() ,userController.userById);
    app.get('/user/email/:slug', authUtils.auth() ,userController.userByEmail);
};
