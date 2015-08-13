var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Post', postSchema);