var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var institutionSchema = new mongoose.Schema({
    name: {type: String},
    location: {type: [Number], index: '2d'},
    institution_code: {type: String},
    email: {type: [String]},
    phone: {type: [String]},
    added_by: {type: mongoose.Schema.ObjectId, ref: 'User'},
    type: {type: String},
    students: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

institutionSchema.plugin(timestamps);
module.exports = mongoose.model('Institution', institutionSchema);