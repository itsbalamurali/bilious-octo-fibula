var Post = require('../models/Post');
var User = require('../models/User');
var Institution = require('../models/Institution');

exports.getFeed = function(req, res) {
	//todo extend this a lot
	var posts = Post.find({institution:User.institution},function(err,posts){
		if(err){
			res.json(err);
		}else{
			res.json({});
		}
	});
};