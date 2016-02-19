var mongoose = require('mongoose');

var departmentSchema = new mongoose.Schema({
    name: String,
    description: String
});

module.exports = mongoose.model('Department', departmentSchema);