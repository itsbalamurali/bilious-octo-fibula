var User = require('../models/User');
var nodemailer = require('nodemailer');
var client = require('../middlewares/validateRequest').redisClient
var Institution = require('../models/Institution');
var async = require('async');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../config');
var moment = require('moment');

//create new user
exports.create = function (req, res) {
	//Add validation
    var dateofbirth = moment(req.body.dob);
    // get institution id
    /*
    var institution_id = Institution.find()
        req.body.institution_code;
    */
	var user = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dob: dateofbirth,
        institution: institution_id
	});

	user.save(function (err) {
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
exports.update = function (req, res) {
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
			}, req.body.user, function (err, usere) {
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
exports.login = function (req, res) {
	// find the user
	User.findOne({
		username: req.body.username
	}, function (err, user) {
		if (err) {
			res.status = 500;
			res.json({
				status: 500,
				message: "Oops! Something went wrong!"
			})
		}
		else {
			if (!user) {
				res.json({
					success: false,
					message: 'Authentication failed. User not found.'
				});
			} else if (user) {

				// check if password matches
				user.comparePassword(req.body.password, function (err, isMatch) {
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
								message: 'Authentication Successfull!',
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
exports.logout = function (req, res) {
	// Mostly the token should exist.
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
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
exports.resetPassword = function (req, res) {
    async.waterfall([
		function (done) {
			crypto.randomBytes(20, function (err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function (token, done) {
			User.findOne({ email: req.body.email }, function (err, user) {
				if (!user) {
					res.json({error:'No account with that email address exists.'});
				}
				user.resetPasswordToken = token;
				user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
				user.save(function (err) {
					done(err, token, user);
				});
			});
		},
		function (token, user, done) {
			var smtpTransport = nodemailer.createTransport(smtpTransport( {
				host: config.smtp.host,
    			port: config.smtp.port,
				auth: {
					user: config.smtp.user,
					pass: config.smtp.password
				}
			}));
			var mailOptions = {
				to: user.email,
				from: 'noreply@app.com',
				subject: 'App Password Reset',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				'http://' + req.headers.host + '/reset/' + token + '\n\n' +
				'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};
			smtpTransport.sendMail(mailOptions, function (err) {
				req.json({info: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
				done(err, 'done');
			});
		}
	], function (err) {
		if (err) return next(err);
		res.json({info:'done'});
	});
};

//get user profile
exports.getOne = function (req, res) {
	User.findById(req.params.id, function (err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json(user);
		}
	});
};

//get/list all users
exports.getAll = function (req, res) {
	if (req.user.role == 'admin') {
		User.find(function (err, users) {
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
exports.authenticatedUser = function (req, res) {
	if (req.user.username) {
		User.findOne({
			username: req.user.username
		}).exec(function (err, user) {
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
exports.getSettings = function (req, res) { };

//update user settings
exports.updateSettings = function (req, res) { };
