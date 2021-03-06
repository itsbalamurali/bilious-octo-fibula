var User = require('./models/User');
var Institution = require('./models/Institution');
var Classy = require('./models/Class');
var Installation = require('./models/Installation');
var AnonymousPost = require('./models/AnonymousPost').AnonymousPost;
var AnonymousPostComment = require('./models/AnonymousPost').AnonymousPostComment;
var Post = require('./models/Post').Post;
var mongoose = require('mongoose');
var faker = require('faker');

mongoose.connect('localhost/test');


// generate five colleges for each college generate 5 classes for each class five students for student five posts
// for each post five comments and two likes and two anonymous posts with random votes

//Generate Colleges

var generateStudents = function(Nclass) {
	for (i = 0; i < 5; i++) {
		createStudent(new User({
			institution: Nclass.institution,
			class: Nclass.id
		}));
	}
}

var generateClasses = function(institute) {
	for (i = 0; i < 5; i++) {
		createClass(new Classy({
			institution: institute.id,
		}));
	}
}

var generateInstis = function() {
	for (i = 0; i < 5; i++) {
		createInsti();
	}
}

var createInsti = function() {
	var newInsti = new Institution({
		name: faker.company.companyName(),
		location: [faker.address.longitude(), faker.address.latitude()],
		institution_code: faker.random.uuid(),
		email: faker.internet.email(),
		phone: faker.phone.phoneNumberFormat()
	})

	newInsti.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			generateClasses(newInsti);
		}
	})
}

var createClass = function(newClass) {
	newClass.name = faker.company.bs();
	newClass.start_date = faker.date.past();
	newClass.end_date = faker.date.future();

	newClass.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			generateStudents(newClass);
		}
	})
}

var createStudent = function(stud) {
	stud.username = faker.internet.userName();
	stud.password = "lolpassword";
	stud.email = faker.internet.email();
	stud.firstname = faker.name.firstName();
	stud.lastname = faker.name.lastName();
	stud.mobileno = faker.phone.phoneNumberFormat();
	stud.dob = faker.date.past();
	stud.gender = faker.random.boolean() ? "male" : "female";
	stud.picture = faker.image.avatar();
	stud.role = "student";
	stud.account_status = "active";

	stud.save(function(err) {
		if (err) {
			console.log(err)
		} else {
			generatePosts(stud)
		}
	})
}

var generatePosts = function(stud) {
	for (i = 0; i < 5; i++) {
		createPost(new Post({
			author: stud.id,
			institution: stud.institute,
			action_type: "update_status"
		}));
	}
}

var createPost = function(post) {
	post.message = faker.lorem.sentence();
	post.location = [faker.address.longitude(), faker.address.latitude()];
	post.save(function(err) {
		if (err) console.log(err);
	});
}

generateInstis();
