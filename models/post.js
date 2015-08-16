var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var postSchema = new mongoose.Schema({
});

postSchema.plugin(timestamps);
module.exports = mongoose.model('Post', postSchema);