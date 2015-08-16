var Installation = require('../models/Installation');

exports.create = function(req, res) {
  var installation = new Installation({
   //todo here
  });  
  installation.save(function(err) {
    if (err){
      res.send(err);
  	} else {
      res.header('Status', 201);
      res.header('Location',req.hostname+'/installations/'+installation.id);
      res.json({ 
          createdAt: installation.createdAt,
          objectId: installation.id,
        });
   }
  });


};

exports.getAll = function(req, res) {
  Installation.find(function(err, installations) {
    if (err){
       res.send(err);
    }else{
       res.json(installations);
    }
  });
};

exports.getOne = function(req, res) {
  Installation.findById(req.params.id, function(err, installation) {
    if (err){
      res.send(err);
    }else{
      res.json(installation);      
    }
  });
};

exports.update = function(req, res) {};

exports.delete = function(req, res) {};