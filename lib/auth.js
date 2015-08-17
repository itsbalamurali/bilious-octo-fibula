var User = require('../models/User');

var validateUser = function(decoded) {
	if (decoded.username) {
		User.findOne({
			username: decoded.username
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
