var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var anonymouspostSchema = new mongoose.Schema({
});


module.exports = mongoose.model('AnonymousPost', anonymouspostSchema);