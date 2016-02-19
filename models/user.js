var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('User', userSchema);

// middleware for improving on password saving

userSchema.pre('save', function (done) {
    var user = this;

    if (!user.isModified('password')) {
        return done();
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return done(err);
        }
        
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return done(err);  
            }
            
            user.password = hash;
            
            done(); 
        });
    });
});
