var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var institutionSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Institution', institutionSchema);