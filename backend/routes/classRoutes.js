const express = require('express');
const router = express.Router();
const {
    getAllClasses,
    createClass,
    updateClass,
    deleteClass
} = require('../controllers/classController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllClasses);
router.post('/', authMiddleware, createClass);
router.put('/:id', authMiddleware, updateClass);
router.delete('/:id', authMiddleware, deleteClass);

module.exports = router;
