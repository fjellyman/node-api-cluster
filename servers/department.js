var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/departments');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var departments = require('../routes/department.js')(app);

var port = 3020;

app.listen(port, function () {
  console.log('Department Server Port:', port);
});