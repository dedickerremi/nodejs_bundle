const mongodb = {
    docker: 'mongodb://mongo:27017/app-docker',
    production: 'mongodb://localhost/myapp-prod',
    dev: 'mongodb://localhost/myapp-dev',
    test: 'mongodb://localhost/myapp-unittest'
}


module.exports = {
    mongoConfig: mongodb,
};
