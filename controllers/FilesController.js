var pkgcloud = require('pkgcloud').storage;
var formidable = require('formidable');
var config = require('../config');
var uuid = require('node-uuid');

//create a client
var storageClient = pkgcloud.createClient({
    provider: 'amazon',
    keyId: config.s3.accessKeyId, // access key id
    key: config.s3.secretKey, // secret key
    region: config.s3.region // region
  });
  
  
//upload a file
exports.upload = function(req, res) {

  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = "./uploads";

  form.parse(req, function(err, fields, files) {
  if (err) {
      console.error(err);
    }
  else{
      console.log(files);
    }
  });
    
  var writeStream = storageClient.upload({
    container: config.s3.bucket,
    remote: uuid.v1()+'_'+req.params.name
  });
  
  writeStream.on('error', function(err) {
    // handle your error case 
    console.log(err);
  });
 
  writeStream.on('success', function(file) {
    // success, file will be a File model 
    res.header('Status', 201);
      res.header('Location',req.hostname+'/files/'+file.name);
      res.json({ 
          url: file.url,
          name:file.name
      });
  });
};

//delete a file
exports.delete = function(req, res) {
  var deleteFile = storageClient.removeFile({
     container: config.s3.bucket,
     file: req.params.name
  });
  
  deleteFile.on('error', function(err) {
    // handle your error case 
    console.log(err);
     res.json({ 
          message: 'error'
      });
  });
  
  deleteFile.on('success', function(file) {
      res.header('Status', 200);
      res.json({ 
          message: 'success'
      });
  });
};