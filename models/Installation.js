var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var installationSchema = new mongoose.Schema({
	badge: {type:String}, // Check: What is this?
	channels: [{type:String}], // Check: ?
	time_zone: {type:Number}, // Check: Again.
	device_type: {type:String},
	push_type: {type:String},
	gcm_sender_id: {type:String},
	device_token: {type:String},
	channel_uris: [{type:String}],
	app_name: {type:String},
	app_version: {type:Number},
	app_identifier: {type:String}
});

installationSchema.plugin(timestamps);
module.exports = mongoose.model('Installation', installationSchema);