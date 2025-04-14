const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10); //ivesto slaptazodzio sifravimas naudojant bcrypt, 10 - salt(atsitiktine reiksme pridedama prie pw) rounds (kiek kartu slaptazodis bus maisomas)
    try {
        const user = await User.create({ username, password: hash }); //db issaugomas hash slaptazodis
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: 'User already exists' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password); //tikrina ar slaptazodis atitinka
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
};
