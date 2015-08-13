var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var anonymouspostSchema = new mongoose.Schema({
});


module.exports = mongoose.model('AnonymousPost', anonymouspostSchema);