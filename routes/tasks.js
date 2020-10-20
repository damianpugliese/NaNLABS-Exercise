const express = require('express');
const router = express.Router();

const { addTask } = require('../controllers/tasks');

router.post('/add', addTask);

module.exports = router;