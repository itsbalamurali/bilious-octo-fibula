/* global process */
var express = require('express');

var files = require('./controllers/FilesController.js');
var installations = require('./controllers/InstallationsController.js');
var users = require('./controllers/UsersController.js');
var posts = require('./controllers/PostsController.js');
var postcomments = require('./controllers/PostCommentsController.js');
var anonymousposts = require('./controllers/AnonymousPostsController.js');
var newsfeed = require('./controllers/NewsfeedController.js');
var notifications = require('./controllers/NotificationsController.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.json({ status:200,
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
router.get('/users/:id', users.getOne);
router.get('/users', users.getAll);
router.post('/users/me', users.authenticatedUser);

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
/// implementation todo
router.get('/feed/:id/likepost', posts.likePost);
router.get('/feed/:id/unlikepost', posts.unlikePost);
///

router.get('/feed/:id/comments', postcomments.getAll);
router.post('/feed/:id/comments', postcomments.create);
router.get('/feed/:id/comments/:id', postcomments.getOne);
router.delete('/feed/:id/comments/:id', postcomments.delete);
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
//router.put('/notifications/:id', notifications.update);
//router.delete('/notifications/:id', notifications.delete);

/*
 * Anonymous Posts Routes
 */
router.get('/anonymousposts', anonymousposts.getAll);
router.get('/anonymousposts/:id', anonymousposts.getOne);
router.post('/anonymousposts/:id/comments', anonymousposts.createComment);


//Files routes
router.post('/files/:name',files.upload);
router.delete('/files/:name',files.delete);

module.exports = router;