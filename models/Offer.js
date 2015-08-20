var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var offerSchema = new mongoose.Schema({});

offerSchema.plugin(timestamps);
module.exports = mongoose.model('Offer', offerSchema);