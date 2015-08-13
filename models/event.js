var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Event', eventSchema);