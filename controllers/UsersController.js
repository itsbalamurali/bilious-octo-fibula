var User = require('../models/User');
var nodemailer = require('nodemailer');

//create new user
exports.create = function(req, res) {
	//Add validation
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		name: req.body.name
	});
	user.save(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.header('Status', 201);
			res.header('Location', req.hostname + '/users/' + user.username);
			res.json({
				createdAt: user.createdAt,
				objectId: user.id,
				sessionToken: ""
			});
		}
	});
};

//update user
exports.update = function(req, res) {
	if (req.params.username == req.user.username || req.user.role == 'admin') {
		if (req.body && req.body.user && req.body.user.username || req.body && req.body
			.user && req.body.user.email || req.body && req.body
			.user && req.body.user.password) {
			res.status = 403
			res.send({
				status: 403,
				message: "You are allowed to change some feilds!"
			})
		} else {
			User.findOneAndUpdate({
				username: req.params.username
			}, req.body.user, function(err, usere) {
				if (err) {
					res.status = 500
					res.send({
						status: 500,
						message: "Oops! Something Went Wrong"
					})
				} else {
					res.status = 200
					res.end()
				}
			})
		}
	} else {
		res.status = 401;
		res.json({
			"status": 401,
			"message": "Not Authorized"
		});
	}
};


//login user
exports.login = function(req, res) {

};

//logout user
exports.logout = function(req, res) {

};

//reset user password
exports.resetPassword = function(req, res) {

};

//get user profile
exports.getOne = function(req, res) {
	User.findById(req.params.id, function(err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
};

//get/list all users
exports.getAll = function(req, res) {
	if (req.user.role == 'admin') {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			} else {
				res.json(users);
			}
		});
	} else {
		res.status = 401;
		res.json({
			"status": 401,
			"message": "Not Authorized"
		});
	}
};

//get details of logged in user
exports.authenticatedUser = function(req, res) {
	if (req.user.username) {
		User.findOne({
			username: req.user.username
		}).exec(function(err, user) {
			if (err) {
				res.status = 500
				res.send({
					status: 500,
					message: "Oops! Something Went Wrong"
				})
			} else {
				res.json(user)
			}
		})
	} else {
		res.status = 401;
		res.json({
			"status": 401,
			"message": "Not Authorised"
		})
	}
};

//get user settings
exports.getSettings = function(req, res) {};

//update user settings
exports.updateSettings = function(req, res) {};
