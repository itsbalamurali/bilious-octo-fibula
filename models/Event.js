var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var eventSchema = new mongoose.Schema({
	description: {type:String},
	name: {type:String},
	cover: {
		source: {type:String}
	},
	// Check: Owner is a User
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	// Check: I dont know what to do with timezone
	timezone: {type:Number}, // I think its should be the offset
	place: {
		name: {type:String},
		location: {
			city: {type:String},
			country: {type:String},
			loc: {type:[Number], index:'2d'},
			street: {type:String},
			zip: {type:String}
		}
	},
	ticket_uri: {type:String}, // Check: Like them mera-events page?
	start_time: {type:Date},
	end_time: {type:Date},
	is_date_only: {type:Boolean} // Check: No idea what this is for
});

eventSchema.plugin(timestamps);
module.exports = mongoose.model('Event', eventSchema);