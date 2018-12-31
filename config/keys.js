const secrets = require('./key_secrets');

module.exports = {
    mongoURI: `mongodb://${secrets.username}:${secrets.password}@ds145694.mlab.com:45694/mern`
}