var User = require('../models/User');
var nodemailer = require('nodemailer');
var client = require('../middlewares/validateRequest').redisClient
var Institution = require('../models/Institution');
//create new user
exports.create = function(req, res) {
	//Add validation
	//TODO we need to auto assign intstitution based on email address of user
	//var institutionId = Institution.find({}, {}, function(err, jobs) {
	//if (err) throw err;
	//res.send(jobs);
	//});

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
				sessionToken: user.genToken()
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
				message: "You are not allowed to change some feilds!"
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
	// find the user
	User.findOne({
		username: req.body.username
	}, function(err, user) {
		if (err) {
			res.status = 500;
			res.json({
				status: 500,
				message: "Oops! Something went wrong!"
			})
		};
		else {
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {

				// check if password matches
				user.comparePassword(req.body.password, function(err, isMatch) {
					if (err) {
						res.status = 500;
						res.json({
							status: 500,
							message: "Oops! Something went wrong!"
						})
					} else {
						if (!isMatch) {
							res.json({
								success: false,
								message: 'Authentication failed. Wrong password.'
							});
						} else {
							var token = user.genToken();
							// return the information including token as JSON
							res.json({
								success: true,
								message: 'Enjoy your token!',
								token: token
							});
						}
					}
				});
			}
		}
	});
};

//logout user
exports.logout = function(req, res) {
	// Mostly the token should exist.
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) ||
		req.headers['x-access-token'];
	if (token) {
		delete req.user;
		client.set(token, true)
			// Expire in 60 days. Could be smaller but wont hurt
		client.expire(token, 60 * 86400)
		res.status = 200;
		res.end()
	} else {
		// Something is Gravely wrong if no token
		res.status = 500;
		res.end();
	}
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
