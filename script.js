var User = require('./models/User');
var Institution = require('./models/Institution');
var Class = require('./models/Class');
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
for(var i=0; i < 20; i++){
    lolclg = new Institution();
    lolclg.name = "";
    lolclg.email = "";
    lolclg.added_by ="";
    lolclg.phone="";
    lolclg.location="";
    lolclg.institution_code="";
    lolclg.save(function(err) {
        console.log(lolclg);
        for(var i=0; i<5; i++){
            lolclass = new Class();
            lolclass.name = "";
            lolclass.institution=lolclg.id;
            lolclass.start_date="";
            lolclass.end_date="";
            lolclass.save(function(err) {
                console.log(lolclass);
                for(var i=0; i<5; i++) {
                    lolstudent = new User();
                    lolstudent.username="";
                    lolstudent.email="";
                    lolstudent.password="lolpassword";
                    lolstudent.dob="";
                    lolstudent.firstname="";
                    lolstudent.lastname="";
                    lolstudent.class=lolclass.id;
                    lolstudent.institution=lolclg.id;
                    lolstudent.mobileno="";
                    lolstudent.gender="";
                    lolstudent.picture="";
                    lolstudent.role="";
                    lolstudent.save(function(err, student) {
                        console.log(lolstudent);
                        console.log(student.genToken());
                    })
                }
                })
        }
    });
/*
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
*/
    anonpost = new AnonymousPost();
    anonpost.message = "";
    anonpost.author = "";
    anonpost.institution = "gouthamve@gmail.com";
    anonpost.handle = "admin";
    anonpost.location = [89,98];
    anonpost.save(function(err, anonpost) {
        console.log(anonpost);
    })
}


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