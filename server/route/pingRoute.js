const pingController = require('../controllers/pingController')

module.exports = function(app){
    app.get('/ping', pingController.ping);

};
