var AnonymousPost = require('../models/AnonymousPost');
var AnonymousPostComment = require('../models/AnonymousPostComment');
var User = require('../models/User');
var config = require('../config.js');

//create a post
exports.create = function(req, res) {
  if (!req.user || !req.body.message) {
    res.status = 400;
    res.json({
      status: 400,
      message: "Bad request"
    })
  } else {
    var anonymouspost = new AnonymousPost({
      message: req.body.message,
      author: req.user.id,
      handle: req.body.handle,
      location: req.body.location
    });

    User.findOne({
      username: req.user.username
    }, function(err, user) {
      if (err || !user) {
        res.status = 500;
        res.json({
          status: 500,
          message: "Oops! Something went Wrong"
        })
      } else {
        anonymouspost.institution = user.institution
        anonymouspost.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.header('Status', 201);
            res.header('Location', req.hostname + '/anonymousposts/' +
              anonymouspost.id);
            res.json({
              createdAt: anonymouspost.createdAt,
              objectId: anonymouspost.id
            });
          }
        });
      }
    })
  }
};

//get latest posts
exports.getLatest = function(req, res) {
  AnonymousPost.find().sort('-date').limit(10).exec(function(err, anonPosts) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json(anonPosts);
    }
  });
};

//get hottest posts
exports.getHottest = function(req, res) {
  //(net upvotes) / (time passed). and sort
  AnonymousPost.find(function(err, users) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json(users);
    }
  });
};

//get a single post with comments list
exports.getOne = function(req, res) {
  AnonymousPost.findById(req.params.id, function(err, anonymouspost) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json(anonymouspost);
    }
  });
};

//to upvote a post
exports.upvote = function(req, res) {
  AnonymousPost.findById(req.params.id, function(err, anonymouspost) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      anonymouspost.upvote(req.user.id);
      res.json({
        vote: 'true'
      });
    }
  });
};

//downvote a post
exports.downvote = function(req, res) {
  AnonymousPost.find(req.params.id, function(err, user) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json(user);
    }
  });
};

//to create a comment
exports.createComment = function(req, res) {
  var comment = new AnonymousPostComment({
    message: req.body.message,
    author: req.body.author,
    location: req.body.location
  });
  comment.save(function(err) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.header('Status', 201);
      res.header('Location', req.hostname + '/anonymousposts/' +
        anonymouspost.id);
      res.json({
        createdAt: comment.createdAt,
        objectId: comment.id
      });
    }
  });
};

//to upvote a comment
exports.upvoteComment = function(req, res) {

};

//to downvote a comment
exports.downvoteComment = function(req, res) {

};


//delete a comment
exports.deleteComment = function(req, res) {
  AnonymousPostComment.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json({
        message: 'comment deleted'
      });
    }
  });
};

//delete a post
exports.delete = function(req, res) {
  AnonymousPost.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status = 500;
      res.json({
        status: 500,
        message: "Oops! Something went wrong!"
      })
    } else {
      res.json({
        message: 'post deleted'
      });
    }
  });
};

//report a post
exports.reportPost = function(req, res) {

};

//report a comment
exports.reportComment = function(req, res) {

};
