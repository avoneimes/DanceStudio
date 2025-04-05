const Class = require('../models/Class');

exports.getAllClasses = async (req, res) => {
    const classes = await Class.find();
    res.json(classes);
};

exports.createClass = async (req, res) => {
    const newClass = await Class.create({ ...req.body, createdBy: req.userId });
    res.status(201).json(newClass);
};

exports.updateClass = async (req, res) => {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteClass = async (req, res) => {
    await Class.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
