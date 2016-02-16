var mongoose = require('mongoose');

var departmentSchema = mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Department', departmentSchema);