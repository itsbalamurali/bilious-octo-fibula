var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var classSchema = new mongoose.Schema({
  name: {
    type: String
  },
  institution: {
    type: mongoose.Schema.ObjectId,
    ref: 'Institution'
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  }
});

classSchema.plugin(timestamps);
module.exports = mongoose.model('Class', classSchema);
