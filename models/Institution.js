var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var institutionSchema = new mongoose.Schema({
	name:{type:String},
	location:{ type:[Number], index:'2d'},
	email:[],
	phone:[],
	addedby:{ type: mongoose.Schema.ObjectId, ref: 'User' },
	type: { type: String },
	students : [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

institutionSchema.plugin(timestamps);
module.exports = mongoose.model('Institution', institutionSchema);