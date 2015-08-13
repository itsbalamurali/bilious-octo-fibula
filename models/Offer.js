var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var offerSchema = new mongoose.Schema({
});


module.exports = mongoose.model('Offer', offerSchema);