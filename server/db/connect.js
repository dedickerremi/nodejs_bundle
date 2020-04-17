let mongoose = require('mongoose');
let config = require('../config');

mongoose.connect(config.mongo, {useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connection OK', 'database name '+ config.mongo);
});
