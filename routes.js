/* global process */
var express = require('express');

var files = require('./controllers/FilesController.js');
var installations = require('./controllers/InstallationsController.js');
var users = require('./controllers/UsersController.js');
var posts = require('./controllers/PostsController.js');
var anonymousposts = require('./controllers/AnonymousPostsController.js');
var newsfeed = require('./controllers/NewsfeedController.js');
var notifications = require('./controllers/NotificationsController.js');
var appsconfig = require('./lib/appsconfig.js');
var events = require('./controllers/EventsController.js');
var offers = require('./controllers/OffersController.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status: 200,
    message: 'this is end of your limits dude!!!',
    uptime: process.uptime()
  });
});


/*
 * User routes
 */
router.post('/users/login', users.login);
router.post('/users/logout', users.logout);
router.post('/users/reset_password', users.resetPassword);
router.post('/users', users.create);
router.get('/users/me', users.authenticatedUser);
router.get('/users/settings', users.getSettings);
router.put('/users/settings', users.updateSettings);
router.get('/users/:username', users.getOne);
router.put('/users/:username', users.update);
router.get('/users', users.getAll);
/*
 * Installations routes
 */
router.post('/installations', installations.create);
router.get('/installations', installations.getAll);
router.get('/installations/:id', installations.getOne);
router.put('/installations/:id', installations.update);
router.delete('/installations/:id', installations.delete);


/*
 * Posts routes
 */
router.post('/feed', posts.create);
router.get('/feed', newsfeed.getFeed);
router.get('/feed/:id', posts.getOne);
router.get('/feed/:id/likes', posts.getLikes);
router.post('/feed/:id/like', posts.likePost); //represented with 1,0,-1
router.get('/feed/:id/comments', posts.getAllcomments);
router.post('/feed/:id/comments', posts.createComment);
router.get('/feed/:id/comments/:id', posts.getComment);
router.delete('/feed/:id/comments/:id', posts.deleteComment);
router.put('/feed/:id', posts.update);
router.delete('/feed/:id', posts.delete);


/*
 * Installations routes
 */
router.post('/installations', installations.create);
router.get('/installations', installations.getAll);
router.get('/installations/:id', installations.getOne);
router.put('/installations/:id', installations.update);
router.delete('/installations/:id', installations.delete);


/*
 * Notification routes
 */
//router.post('/notifications', notifications.create);
router.get('/notifications', notifications.getAll);
router.get('/notifications/:id', notifications.getOne);
router.post('/notifications/:id', notifications.update); //mark as read

//router.put('/notifications/:id', notifications.update);
//router.delete('/notifications/:id', notifications.delete);

/*
 * Anonymous Posts Routes
 */
router.get('/anonymousposts', anonymousposts.getLatest); //latest posts
router.post('/anonymousposts', anonymousposts.create); //latest posts
router.get('/anonymousposts/hot', anonymousposts.getHottest); //latest posts
router.get('/anonymousposts/:id', anonymousposts.getOne);
router.get('/anonymousposts/:id', anonymousposts.reportPost);
router.get('/anonymousposts/:id/upvote', anonymousposts.upvote); // represented with 1,0,-1
router.get('/anonymousposts/:id/downvote', anonymousposts.downvote); // represented with 1,0,-1
router.post('/anonymousposts/:id/comments', anonymousposts.createComment);
router.get('/anonymousposts/:postid/comments/:commentid/upvote', anonymousposts
  .upvoteComment);
router.get('/anonymousposts/:postid/comments/:commentid/downvote',
  anonymousposts.downvoteComment);
router.delete('/anonymousposts/:postid/comments/:commentid', anonymousposts.deleteComment);
router.post('/anonymousposts/:postid/comments/:commentid', anonymousposts.reportComment);
router.delete('/anonymousposts/:id', anonymousposts.delete);

//Files routes
router.post('/files/:name', files.upload);
router.delete('/files/:name', files.delete);

//App Config routes
router.get('/appconfig', appsconfig.getCurrentConfig);

module.exports = router;
