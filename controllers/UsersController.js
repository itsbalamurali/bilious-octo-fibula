var User = require('../models/User');
var nodemailer = require('nodemailer');

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
  	} else {
      res.header('Status', 201);
      res.header('Location',req.hostname+'/users/'+user.id);
      res.json({ 
          createdAt: user.createdAt,
          objectId: user.id,
          sessionToken: ""
        });
   }
  });

};

//update user
exports.update = function(req, res) {};


//login user
exports.login = function(req, res) {};

//logout user
exports.logout = function(req, res) {};

//reset user password
exports.resetPassword = function(req, res) {
  
};

//get user profile
exports.getOne = function(req, res) {
   User.findById(req.params.id, function(err, user) {
    if (err){
      res.send(err);
    }else{
      res.json(user);      
    }
  });
};

//get/list all users
exports.getAll = function(req, res) {
  User.find(function(err, users) {
    if (err){
       res.send(err);
    }else{
       res.json(users);
    }
  });
};

//get details of logged in user
exports.authenticatedUser = function(req, res) {};

//get user settings
exports.getSettings = function(req, res) {};

//update user settings
exports.updateSettings = function(req, res) {};