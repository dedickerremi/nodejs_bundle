const {mongoConfig} = require('./config')
const nodeEnv = process.env.NODE_ENV || 'dev';
const secret = '2MzdqxtU6Gk1ERSff8AC';

module.exports = {
    mongo : mongoConfig[nodeEnv],
    env: nodeEnv,
    JwtSecret: secret
}