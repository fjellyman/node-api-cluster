var DB = require('./user.js');
var db = new DB({connectionString: "postgres://fjellyman@localhost/compadr-db"});

// db.findById('membership.users', 6442338199908910081, display);
// db.findById('membership.users', 1, display);
db.find('membership.users', null, display);

function display(err, res){
    console.log('ERROR:', err)
    console.log('RESULT:', res);
};