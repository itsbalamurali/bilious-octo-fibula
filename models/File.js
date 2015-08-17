var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var fileSchema = new mongoose.Schema({
	
});

fileSchema.plugin(timestamps);
module.exports = mongoose.model('File', fileSchema);