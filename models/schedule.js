var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Schedule', scheduleSchema);