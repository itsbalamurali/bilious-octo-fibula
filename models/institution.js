var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var institutionSchema = new mongoose.Schema({
	students : [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

institutionSchema.plugin(timestamps);
module.exports = mongoose.model('Institution', institutionSchema);