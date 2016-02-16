var _ = require('lodash');
var Department = require('../models/department');

module.exports = function (app) {

    var modelName = 'department';
    var controllerUrl = '/' + modelName;

    /* Create */
    app.post(controllerUrl, function (req, res) {
        var department = new Department(req.body);
        department.save(function (err) {
            if (err) {
                res.json({ info: 'error adding ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' added successfully' });
            }
        });

    });
    
    /* Read */
    app.get(controllerUrl, function (req, res) {
        Department.find(function (err, departments) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                res.json({ info: modelName + 's found successfully', data: departments });
            }
        });
    });

    app.get(controllerUrl + '/:id', function (req, res) {
        Department.findById(req.params.id, function (err, department) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (department) {
                    res.json({ info: modelName + ' found successfully', data: department });
                } else {
                    res.json({ info: modelName + ' not found' });
                }

            }
        });
    });
    
    /* Update */
    app.put(controllerUrl + '/:id', function (req, res) {
        Department.findById(req.params.id, function (err, department) {
            if (err) {
                res.json({ info: 'error finding ' + modelName, error: err });
            } else {
                if (department) {
                    _.merge(department, req.body);

                    department.save(function (err) {
                        if (err) {
                            res.json({ info: 'error updating ' + modelName, error: err });
                        } else {
                            res.json({ info: modelName + ' updated successfully', data: department });
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
        Department.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error removing ' + modelName, error: err });
            } else {
                res.json({ info: modelName + ' removed successfully' });
            }
        });
    });
};