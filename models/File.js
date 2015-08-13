var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
});


module.exports = mongoose.model('File', fileSchema);