var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var likes = require('mongoose-voting');

var postCommentsSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  institution: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution'
  },
  images: [{
    type: String
  }], //array of image urls
  location: {
    type: [Number],
    index: '2d'
  }
});

var postSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  institution: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution'
  },
  action_type: {
    type: String,
    required: true
  }, //image_upload,video_upload,file_share,update_status
  images: [{
    type: String
  }], //array of image urls
  video: {
    type: String
  }, //video url
  files: [{
    type: String
  }],
  location: {
    type: [Number],
    index: '2d'
  },
  comments: [postCommentsSchema]
});

postCommentsSchema.plugin(timestamps);
postSchema.plugin(timestamps);
postSchema.plugin(likes);
module.exports.PostComment = mongoose.model('PostComment', postCommentsSchema);
module.exports.Post = mongoose.model('Post', postSchema);
