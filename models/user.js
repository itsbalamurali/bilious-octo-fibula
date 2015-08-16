var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true},
  email: { type: String, unique: true, lowercase: true},
  name: { type: String, default: ''},
  gender: { type: String, default: '' },
  picture: { type: String, default: ''},
  institution: { type: mongoose.Schema.ObjectId, ref: 'Institution' },
  facebook: String,
  twitter: String,
  google: String,
  instagram: String,
  linkedin: String,
  
  tokens: Array,
  
  
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Password hash middleware.
 */
 
// Execute before each user.save() call
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

/**
 * Helper method for getting user's vanillicon.
 */
userSchema.methods.vanillicon = function() {
  if (!this.email) return 'https://vanillicon.com/' + crypto.createHash('md5').update('balamurali@live.com').digest('hex') +'_'+ 100 + '.png';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://vanillicon.com/' + md5 + '_' + 100 + '.png';
};

userSchema.plugin(timestamps);
userSchema.hasMany('Post');
userSchema.hasMany('AnonymousPost');
userSchema.belongsTo('Institution', {through: 'institution'});
module.exports = mongoose.model('User', userSchema);