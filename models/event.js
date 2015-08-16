var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var eventSchema = new mongoose.Schema({
	description: String,
	name: String,
	cover: {
		source: String
	},
	// Check: Owner is a User
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	// Check: I dont know what to do with timezone
	timezone: String, // I think its should be the offset
	place: {
		name: String,
		"location": {
			city: String,
			country: String,
			loc: {
				lng: Number,
				lat: Number
			},
			street: String,
			zip: String
		}
	},
	ticket_uri: String, // Check: Like them mera-events page?
	start_time: Date,
	end_time: Date,
	is_date_only: Boolean // Check: No idea what this is for
});

eventSchema.plugin(timestamps);
module.exports = mongoose.model('Event', eventSchema);