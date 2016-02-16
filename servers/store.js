var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stores');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var stores = require('../routes/store.js')(app);

var port = 3030;

app.listen(port, function () {
  console.log('Store Server Port:', port);
});