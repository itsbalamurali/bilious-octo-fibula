var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var notificationSchema = new mongoose.Schema({});

notificationSchema.plugin(timestamps);
module.exports = mongoose.model('Notification', notificationSchema);