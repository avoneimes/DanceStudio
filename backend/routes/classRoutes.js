// klases CRUD marsrutai
const express = require('express');
const router = express.Router();
const {
    getAllClasses,
    createClass,
    updateClass,
    deleteClass
} = require('../controllers/classController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllClasses); //visi gali perziureti
router.post('/', authMiddleware, createClass); // tik prisijunges gali kurti
router.put('/:id', authMiddleware, updateClass); // tik prisijunges gali redaguoti
router.delete('/:id', authMiddleware, deleteClass); // tik prisijunges gali istrinti

module.exports = router;
