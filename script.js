var User = require('./models/User')
var mongoose = require('mongoose')

mongoose.connect('localhost/test')

console.log("LOL")

User.findOne({
	username: "gouthamve"
}).exec(function(err, user) {
	if (!user) {
		newUser = new User()
		newUser.username = "gouthamve"
		newUser.password = "thisisadumbpassword"
		newUser.email = "gouthamve@gmail.com"
		newUser.role = "admin"
		newUser.save(function(err, goutham) {
			console.log(goutham.genToken())
		})
	} else {
		console.log(user.genToken())
	}
})
