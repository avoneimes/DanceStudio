const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: String,
    schedule: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Class', classSchema);
