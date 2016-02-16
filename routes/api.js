var request = require('request').defaults({
    json: true
});

var async = require('async');

var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

module.exports = function (app) {
    
    /* Read */
    app.get('/api', function (req, res) {

        async.parallel({
            departments: function (done) {
                client.get('http://localhost:3020/department', function (error, data) {
                    if (error) {
                        throw error;
                    } else if (data) {
                        done(null, JSON.parse(data));
                    } else {
                        request({ uri: 'http://localhost:3020/department' }, function (error, response, body) {
                            if (error) {
                                done({ service: 'department', error: error });
                                return;
                            } else if (!error && response.statusCode === 200) {
                                done(null, body.data);
                                client.setex('http://localhost:3020/department', 10, JSON.stringify(body.data), function (error) {
                                    if (error) {
                                        throw error;
                                    }
                                });
                            } else {
                                done(response.statusCode);
                            }
                        });
                    }
                });
            },
            stores: function (done) {
                request({ uri: 'http://localhost:3030/store' }, function (error, response, body) {
                    if (error) {
                        done({ service: 'store', error: error });
                        return;
                    } else if (!error && response.statusCode === 200) {
                        done(null, body.data);
                    } else {
                        done(response.statusCode);
                    }
                });
            },
            users: function (done) {
                request({ uri: 'http://localhost:3010/user' }, function (error, response, body) {
                    if (error) {
                        done({ service: 'user', error: error });
                        return;
                    } else if (!error && response.statusCode === 200) {
                        done(null, body);
                    } else {
                        done(response.statusCode);
                    }
                });
            }
        }, function (error, results) {
            res.json({
                error: error,
                results: results
            });
        });
    });

    app.get('/ping', function (req, res) {
        res.json({ pong: Date.now() });
    });
};