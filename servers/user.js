var express = require('express');
var app = express();
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

var users = require('../routes/user.js')(app);

var port = 3010;

app.listen(port, function () {
  console.log('User Server Port:', port);
});