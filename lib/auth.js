var User = require('../models/User');

var validateUser = function(decoded, req, res, next, cb) {
	if (decoded.username) {
		User.findOne({
			username: decoded.username
		}, function(err, user) {
			if (err) {
				return cb(req, res, next, null)
			} else {
				console.log(user.role)
				return cb(req, res, next, user)
			}
		})
	} else {
		return cb(req, res, next, null)
	}
}

module.exports.validateUser = validateUser;