/* global process */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.json({ message: 'this is end of your limits dude!!!', 
                 uptime: process.uptime() });   
});

module.exports = router;