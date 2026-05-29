const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', auth, dashboardController.summary);
router.get('/analytics', auth, dashboardController.analytics);

module.exports = router;
