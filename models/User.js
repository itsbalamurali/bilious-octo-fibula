var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var jwt = require('jwt-simple');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    mobileno: {
        type: String,
        default: ''
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: ''
    },
    institution: {
        type: mongoose.Schema.ObjectId,
        ref: 'Institution'
    },
    class: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    },
    authData: {
        facebook: {
            "id": {type: String},
            "access_token": {type: String},
            "expiration_date": {type: Date}
        }
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: String
});

/**
 * Password hash middleware.
 */
// Execute before each user.save() call
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.genToken = function () {
    var expires = expiresIn(60); // 60 days
    return jwt.encode({
        exp: expires,
        username: this.username
    }, require('../config').appsecret);
};


function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

userSchema.plugin(timestamps);
module.exports = mongoose.model('User', userSchema);