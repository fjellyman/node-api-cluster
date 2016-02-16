var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var users = require('./routes/api.js')(app);

var port = 3000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});