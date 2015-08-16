var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var institutionSchema = new mongoose.Schema({
});

institutionSchema.plugin(timestamps);
module.exports = mongoose.model('Institution', institutionSchema);