const fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file === "index.js" || fs.statSync(__dirname + "/" + file).isDirectory()) return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}
