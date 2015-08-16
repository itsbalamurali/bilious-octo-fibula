var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var anonymouspostSchema = new mongoose.Schema({
});

anonymouspostSchema.plugin(timestamps);
module.exports = mongoose.model('AnonymousPost', anonymouspostSchema);