const Class = require('../models/Class');

// klasiu saraso skaitymas
exports.getAllClasses = async (req, res) => {
    const classes = await Class.find(); // Istraukiamos klases is duombazes
    res.json(classes); // grazinamos kaip json atsakymas
};

//  klasiu sukurimas
exports.createClass = async (req, res) => {
    const newClass = await Class.create({ ...req.body, createdBy: req.userId });
    res.status(201).json(newClass);
};

// klasiu atnaujinimas
exports.updateClass = async (req, res) => {
    const updated = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// klasiu istrinimas 
exports.deleteClass = async (req, res) => {
    await Class.findByIdAndDelete(req.params.id);
    res.status(204).end();
};
