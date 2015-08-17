var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var likes = require('mongoose-voting');

var postSchema = new mongoose.Schema({
	  message:{ type: String, required:true},
	  author: { type: mongoose.Schema.ObjectId, ref: 'User' },
	  institution: { type: mongoose.Schema.ObjectId, ref: 'Institution' },
	  type: { type: String, required:true},//image_upload,video_upload,file_share,update_status
	  images:[{ type:String }],//array of image urls
	  video:{ type: String}, //video url
	  files: [{ type: String }],	
	  location: { type:[Number], index:'2d'},
});

postSchema.plugin(timestamps);
postSchema.plugin(likes);
module.exports = mongoose.model('Post', postSchema);