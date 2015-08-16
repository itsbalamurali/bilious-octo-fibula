var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var voting = require('mongoose-voting');
require('mongo-relation');

var anonymouspostSchema = new mongoose.Schema({
      message:{ type: String, required:true},
	  author: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	  handle: { type: String },	
	  location: { type:[Number], index:'2d'},
});

anonymouspostSchema.plugin(timestamps); //created and updated timestamps
anonymouspostSchema.plugin(voting); //for voting

//relations
anonymouspostSchema.belongsTo('User', {through: 'author'});
anonymouspostSchema.hasMany('AnonymousPostComments');
module.exports = mongoose.model('AnonymousPost', anonymouspostSchema);