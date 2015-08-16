var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var installationSchema = new mongoose.Schema({
	badge: String, // Check: What is this?
	channels: [String], // Check: ?
	time_zone: String, // Check: Again.
	device_type: String,
	push_type: String,
	gcm_sender_id: String,
	device_token: String,
	channel_uris: String,
	app_name: String,
	app_version: String,
	app_identifier: String
});

installationSchema.plugin(timestamps);
module.exports = mongoose.model('Installation', installationSchema);