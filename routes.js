/* global process */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
      res.json({ status:200,
                 message: 'this is end of your limits dude!!!', 
                 uptime: process.uptime()
               });   
});

//Files routes
router.post('/files/:name', function(req, res) {
    res.json({ 
          url: 'here goes aws s3 file url',
          name: req.params.name
          });
  });

router.delete('/files/:name',function(req,res){
  res.json({
    status: 200,
    message: 'file deleted'
  })
});
module.exports = router;