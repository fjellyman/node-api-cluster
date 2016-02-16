var _ = require('lodash');
var Store = require('../models/store');

module.exports = function (app) {

    var modelName = 'store';
    var controllerUrl = '/' + modelName;

    /* Create */
    app.post(controllerUrl, function (req, res) {
        var store = new Store(req.body);
        store.save(function (err) {
            if (err) {
                res.json({ info: 'error adding ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' added successfully' });
            }
        });

    });
    
    /* Read */
    app.get(controllerUrl, function (req, res) {
        Store.find(function (err, stores) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                res.json({ info: modelName + 's found successfully', data: stores });
            }
        });
    });

    app.get(controllerUrl + '/:id', function (req, res) {
        Store.findById(req.params.id, function (err, store) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (store) {
                    res.json({ info: modelName + ' found successfully', data: store });
                } else {
                    res.json({ info: modelName + ' not found' });
                }

            }
        });
    });
    
    /* Update */
    app.put(controllerUrl + '/:id', function (req, res) {
        Store.findById(req.params.id, function (err, store) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (store) {
                    _.merge(store, req.body);

                    store.save(function (err) {
                        if (err) {
                            res.json({ info: 'error updating ' + modelName, error: err });
                        } else {
                            res.json({ info: modelName + ' updated successfully', data: store });
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
        Store.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error removing ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' removed successfully' });
            }
        });
    });
};