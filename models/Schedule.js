var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var scheduleSchema = new mongoose.Schema({
});


scheduleSchema.plugin(timestamps);
module.exports = mongoose.model('Schedule', scheduleSchema);