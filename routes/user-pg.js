var _ = require('lodash');
var DB = require('../user');
var db = new DB({connectionString: "postgres://fjellyman@localhost/compadr-db"});

module.exports = function (app) {

    var _users = [];
    var modelName = 'user';
    var controllerUrl = '/' + modelName;

    /* Create */
    app.post(controllerUrl, function (req, res) {
        _users.push(req.body);
        res.json({ info: modelName + ' added successfully' });
    });
    
    /* Read */
    app.get(controllerUrl, function (req, res) {
        db.find('membership.users', null, function (err, users) {
            res.json(users);
        });
    });
    
    app.get(controllerUrl + '/:id', function (req, res) {
        var id = req.params.id; 
                         
        db.findById('membership.users', id, function (err, user) {
            res.json(user);
        });
    });
    
    /* Update */
    app.put(controllerUrl + '/:id', function (req, res) {
        
	    var index = _.findIndex( _users, {
            id: req.params.id
        });
        
        _.merge(_users[index], req.body);
        res.json({ info: modelName + ' updated successfully' }); 
    });
    
    /* Delete */
    app.delete(controllerUrl + '/:id', function (req, res) {
        _.remove(_users, function (user) {
            return user.id === req.params.id;
        });
        res.json({ info: modelName + ' removed successfully'});
    });
};