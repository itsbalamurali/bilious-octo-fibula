var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var installationSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Installation', installationSchema);