var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Schedule', scheduleSchema);