var crypto = require('crypto');

exports.encode = function (payload, secret) {
    var algorithm = 'HS256';
    
    var header = {
        typ: 'JWT',
        alg: algorithm
    };
    
    var jwt = base64Encode(header) + '.' + base64Encode(payload);
    
    return jwt + '.' + sign(jwt, secret);
};

exports.decode = function (token, secret) {
    var segments = token.split('.');
    
    if (segments.length !== 3) {
        throw new Error('Token structure incorrect');
    }
    
    var payload = JSON.parse(base64Decode(segments[1]));
    
    var rawSignature = segments[0] + '.' + segments[1];
    
    if (!verify(rawSignature, secret, segments[2])) {
        throw new Error('Verification failed');
    }
    
    return payload;
};

function base64Encode(str) {
    var json = JSON.stringify(str);
    return new Buffer(json).toString('base64');
}

function base64Decode(str) {
    return new Buffer(str, 'base64').toString();
}

function sign(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function verify(raw, secret, signature) {
    return signature === sign(raw, secret);
}