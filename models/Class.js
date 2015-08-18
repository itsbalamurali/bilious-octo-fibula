var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

//TODO this is to show schedule for individual user
var classSchema = new mongoose.Schema({
	 name: {type:String},
	 institution: {
    	type: mongoose.Schema.ObjectId,
    	ref: 'Institution'
  	 },
});


classSchema.plugin(timestamps);
module.exports = mongoose.model('Schedule', classSchema);