var Post = require('../models/Post');


//Post functions
exports.create = function(req, res) {
  var post = new Post({
    
  });  
  
  post.save(function(err) {
    if (err){
      res.send(err);
  	} else {
      res.header('Status', 201);
      res.header('Location',req.hostname+'/feed/'+post.id);
      res.json({ 
          createdAt: post.createdAt,
          objectId: post.id
        });
   }
  });
};

//Update a post
exports.update = function(req, res) {
	
};

//delete a post
exports.delete = function(req, res) {
	
};

//get a post
exports.getOne = function(req, res) {
	
};

//get post likes
exports.getLikes = function(req, res) {
	
};

//like a post
exports.likePost = function(req, res) {
	
};

//Comments functions
//get all comments of a post
exports.getAllcomments = function(req, res) {
	
};

exports.createComment = function(req, res) {
	
};

exports.getComment = function(req, res) {
	
};

//delete a comment
exports.deleteComment = function(req, res) {
	
};