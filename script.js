var User = require('./models/User');
var Installation = require('./models/Installation');
var AnonymousPost = require('./models/AnonymousPost');
var AnonymousPostComment = require('./models/AnonymousPost');
var Post = require('./models/Post');
var mongoose = require('mongoose');
var faker = require('Faker');

mongoose.connect('localhost/test');

console.log("LOL");


// generate five colleges for each college generate 5 classes for each class five students for student five posts
// for each post five comments and two likes and two anonymous posts with random votes

//Generate Users
//for(var i=0; i < 20; i++){
    User.findOne({
        username: "gouthamve"
    }).exec(function(err, user) {
        if (!user) {
            console.log('=======================================\n');
            newUser = new User();
            newUser.username = "gouthamve";
            newUser.password = "thisisadumbpassword";
            newUser.email = "gouthamve@gmail.com";
            newUser.role = "admin";
            newUser.save(function(err, goutham) {
                console.log(newUser);
                console.log(goutham.genToken());
            })
        } else {
            console.log(user.genToken())
        }
    });
//}


/*
User.findOne({
	username: "gouthamve"
}).exec(function(err, user) {
	if (!user) {
		newUser = new User();
		newUser.username = "gouthamve";
		newUser.password = "thisisadumbpassword";
		newUser.email = "gouthamve@gmail.com";
		newUser.role = "admin";
		newUser.save(function(err, goutham) {
			console.log(goutham.genToken())
		})
	} else {
		console.log(user.genToken())
	}
});
*/