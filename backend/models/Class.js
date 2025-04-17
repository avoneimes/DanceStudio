const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: String,
    schedule: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // nuoroda i naudotojo ID, kuris ja sukure
});

module.exports = mongoose.model('Class', classSchema);
