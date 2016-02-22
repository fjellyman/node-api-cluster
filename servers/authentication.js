var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cors = require('cors');
app.use(cors());

var authentication = require('../routes/authentication.js')(app);

var port = 3040;

app.listen(port, function () {
    console.log('Authenction Server Port:', port);
});