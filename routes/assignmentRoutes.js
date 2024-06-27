
const express = require('express');
const { getAssignments } = require('../controllers/assignmentController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/assignments', authenticate, getAssignments);

module.exports = router;
