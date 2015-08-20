var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

//TODO this is to show schedule for individual user
var scheduleSchema = new mongoose.Schema({
    institution: {
        type: mongoose.Schema.ObjectId,
        ref: 'Institution'
    },
    class: {
        type: mongoose.Schema.ObjectId,
        ref: 'Class'
    }
});


scheduleSchema.plugin(timestamps);
module.exports = mongoose.model('Schedule', scheduleSchema);