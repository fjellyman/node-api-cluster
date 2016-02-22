var _ = require('lodash');
var jwt = require('jwt-simple');
var User = require('../models/user');
var tokenService = require('../services/token');

module.exports = function (app) {

    app.post('/login', function (req, res) {

        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
                throw err;
            }

            if (!user) {
                return res.status(204).json({ info: 'User Not Found' });
            }

            user.isPassword(req.body.password, function (err, isMatch) {
                if (err) {
                    throw err;
                }

                if (!isMatch) {
                    return res.status(401).json({ info: 'Bad Email/Password' });
                }

                var token = tokenService.create(user._id);

                return res.json({
                    info: 'User logged-in successfully',
                    data: {
                        user: user,
                        token: token
                    }
                });

            });
        });
    });
};