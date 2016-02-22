var jwt = require('jwt-simple');

exports.create = function (userId) {
    var payload = {
        sub: userId
    };
    
    return jwt.encode(payload, 'secret');
};