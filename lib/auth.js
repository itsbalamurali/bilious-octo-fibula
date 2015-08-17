var User = require('../models/user');

var validateUser = function(decoded) {
	if (decoded.email) {
		User.findOne({
			email: decoded.email
		}, function(err, user) {
			if (err) {
				return null
			}

			return user
		})
	} else {
		return null
	}
}
