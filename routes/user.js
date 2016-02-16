var _ = require('lodash');
var User = require('../models/user');

module.exports = function (app) {

    var modelName = 'user';
    var controllerUrl = '/' + modelName;

    /* Create */
    app.post(controllerUrl, function (req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                res.json({ info: 'error adding ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' added successfully' });
            }
        });

    });
    
    /* Read */
    app.get(controllerUrl, function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                setTimeout(function () {
                    res.json({ info: modelName + 's found successfully', data: users });
                }, 1000);
            }
        });
    });

    app.get(controllerUrl + '/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (user) {
                    res.json({ info: modelName + ' found successfully', data: user });
                } else {
                    res.json({ info: modelName + ' not found' });
                }

            }
        });
    });
    
    /* Update */
    app.put(controllerUrl + '/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (user) {
                    _.merge(user, req.body);

                    user.save(function (err) {
                        if (err) {
                            res.json({ info: 'error updating ' + modelName, error: err });
                        } else {
                            res.json({ info: modelName + ' updated successfully', data: user });
                        }
                    });
                } else {
                    res.json({ info: modelName + ' not found' });
                }

            }
        });
    });
    
    /* Delete */
    app.delete(controllerUrl + '/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error removing ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' removed successfully' });
            }
        });
    });
};