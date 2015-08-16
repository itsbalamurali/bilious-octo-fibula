var User = require('../models/User');
var nodemailer = require('nodemailer');

//login user
exports.login = function(req, res) {};

//logout user
exports.logout = function(req, res) {};

//reset user password
exports.resetPassword = function(req, res) {};

//create new user
exports.create = function(req, res) {
	var user = new User({
    username: req.body.username,
    password: req.body.password,
	  email: req.body.email,
    name: req.body.name
  });

  user.save(function(err) {
    if (err){
      res.send(err);
  	}
	res.header('Status', 201);
	res.header('Location',user.id);
    res.json({ 
		  createdAt: user.createdAt,
  		objectId: user.id,
  		sessionToken: ""
    });
  });
};

//get user profile
exports.getOne = function(req, res) {};

//get/list all users
exports.getAll = function(req, res) {};

//get details of logged in user
exports.authenticatedUser = function(req, res) {};

//get user settings
exports.getSettings = function(req, res) {};

//update user settings
exports.updateSettings = function(req, res) {};