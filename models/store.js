var mongoose = require('mongoose');

var storeSchema = mongoose.Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    url: String
});

module.exports = mongoose.model('Store', storeSchema);