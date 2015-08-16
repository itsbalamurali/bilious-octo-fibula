var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var voting = require('mongoose-voting');
//require('mongo-relation');

var anonymouspostcommentSchema = new mongoose.Schema({
      comment:{ type: String, required:true},
	  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
	  messageid: { type: mongoose.Schema.ObjectId, ref: 'AnonymousPost' },
	  location: { type:[Number], index:'2d'},
});

anonymouspostcommentSchema.plugin(timestamps); //created and updated timestamps
anonymouspostcommentSchema.plugin(voting); //for voting

//relations
//anonymouspostcommentSchema.belongsTo('User', {through: 'author'});
//anonymouspostcommentSchema.belongsTo('AnonymousPost', {through: 'messageid'});
module.exports = mongoose.model('AnonymousPostComment', anonymouspostcommentSchema);