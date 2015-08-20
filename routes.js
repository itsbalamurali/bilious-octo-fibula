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
var validateRequest = require('./middlewares/validateRequest').validateRequest;
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
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
router.post('/users/logout', validateRequest, users.logout);
router.post('/users/reset_password', users.resetPassword);
router.post('/users', users.create);
router.get('/users/me', validateRequest, users.authenticatedUser);
router.get('/users/settings', validateRequest, users.getSettings);
router.put('/users/settings', validateRequest, users.updateSettings);
router.get('/users/:username', validateRequest, users.getOne);
router.put('/users/:username', validateRequest, users.update);
router.get('/users', validateRequest, users.getAll);

/*
 * Posts routes
 */
router.post('/feed', validateRequest, posts.create);
router.get('/feed', validateRequest, newsfeed.getFeed);
router.get('/feed/:id', validateRequest, posts.getOne);
router.get('/feed/:id/likes', validateRequest, posts.getLikes);
router.post('/feed/:id/like', validateRequest, posts.likePost); //represented with 1,0,-1
router.get('/feed/:id/comments', validateRequest, posts.getAllcomments);
router.post('/feed/:id/comments', validateRequest, posts.createComment);
router.get('/feed/:id/comments/:id', validateRequest, posts.getComment);
router.delete('/feed/:id/comments/:id', validateRequest, posts.deleteComment);
router.put('/feed/:id', validateRequest, posts.update);
router.delete('/feed/:id', validateRequest, posts.delete);


/*
 * Installations routes
 */
router.post('/installations', validateRequest, installations.create);
router.get('/installations', validateRequest, installations.getAll);
router.get('/installations/:id', validateRequest, installations.getOne);
router.put('/installations/:id', validateRequest, installations.update);
router.delete('/installations/:id', validateRequest, installations.delete);


/*
 * Notification routes
 */
//router.post('/notifications', notifications.create);
router.get('/notifications', validateRequest, notifications.getAll);
router.get('/notifications/:id', validateRequest, notifications.getOne);
router.post('/notifications/:id', validateRequest, notifications.update); //mark as read

//router.put('/notifications/:id',validateRequest, notifications.update);
//router.delete('/notifications/:id',validateRequest, notifications.delete);

/*
 * Anonymous Posts Routes
 */
router.get('/anonymousposts', validateRequest, anonymousposts.getLatest); //latest posts
router.post('/anonymousposts', validateRequest, anonymousposts.create); //latest posts
router.get('/anonymousposts/hot', validateRequest, anonymousposts.getHottest); //latest posts
router.get('/anonymousposts/:id', validateRequest, anonymousposts.getOne);
router.get('/anonymousposts/:id', validateRequest, anonymousposts.reportPost);
router.get('/anonymousposts/:id/upvote', validateRequest, anonymousposts.upvote); // represented with 1,0,-1
router.get('/anonymousposts/:id/downvote', validateRequest, anonymousposts.downvote); // represented with 1,0,-1
router.post('/anonymousposts/:id/comments', validateRequest, anonymousposts.createComment);
router.get('/anonymousposts/:postid/comments/:commentid/upvote', validateRequest, anonymousposts
    .upvoteComment);
router.get('/anonymousposts/:postid/comments/:commentid/downvote', validateRequest, anonymousposts.downvoteComment);
router.delete('/anonymousposts/:postid/comments/:commentid', validateRequest, anonymousposts.deleteComment);
router.post('/anonymousposts/:postid/comments/:commentid', validateRequest, anonymousposts.reportComment);
router.delete('/anonymousposts/:id', validateRequest, anonymousposts.delete);

//Files routes
router.post('/files/:name', validateRequest, files.upload);
router.delete('/files/:name', validateRequest, files.delete);

//App Config routes
router.get('/appconfig', appsconfig.getCurrentConfig);

module.exports = router;
