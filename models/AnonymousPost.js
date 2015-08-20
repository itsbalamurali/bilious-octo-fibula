var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var voting = require('mongoose-voting');


var anonymouspostcommentSchema = new mongoose.Schema({
    comment: {type: String, required: true},
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    messageid: {type: mongoose.Schema.ObjectId, ref: 'AnonymousPost'},
    location: {type: [Number], index: '2d'},
});


var anonymouspostSchema = new mongoose.Schema({
    message: {type: String, required: true},
    author: {type: mongoose.Schema.ObjectId, ref: 'User'},
    institution: {type: mongoose.Schema.ObjectId, ref: 'Institution'},
    handle: {type: String},
    location: {type: [Number], index: '2d'},
    comments: [anonymouspostcommentSchema]
});

anonymouspostSchema.plugin(timestamps); //created and updated timestamps
anonymouspostSchema.plugin(voting); //for voting
anonymouspostcommentSchema.plugin(timestamps); //created and updated timestamps
anonymouspostcommentSchema.plugin(voting); //for voting


//relations
//anonymouspostSchema.hasMany('AnonymousPostComments');
module.exports = mongoose.model('AnonymousPost', anonymouspostSchema);
module.exports = mongoose.model('AnonymousPostComment', anonymouspostcommentSchema);