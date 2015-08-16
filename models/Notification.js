var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Notification', notificationSchema);