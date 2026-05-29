const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const expenseCtrl = require('../controllers/expenseController');

router.get('/', auth, expenseCtrl.getAll);
router.post('/', auth, validateRequest(['title', 'amount', 'category']), expenseCtrl.create);
router.put('/:id', auth, validateRequest(['title', 'amount', 'category']), expenseCtrl.update);
router.delete('/:id', auth, expenseCtrl.remove);

module.exports = router;
