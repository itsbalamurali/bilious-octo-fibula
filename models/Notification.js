var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Notification', notificationSchema);