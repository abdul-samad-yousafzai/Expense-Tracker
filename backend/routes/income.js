const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const incomeCtrl = require('../controllers/incomeController');

router.get('/', auth, incomeCtrl.getAll);
router.post('/', auth, validateRequest(['title', 'amount', 'category']), incomeCtrl.create);
router.put('/:id', auth, validateRequest(['title', 'amount', 'category']), incomeCtrl.update);
router.delete('/:id', auth, incomeCtrl.remove);

module.exports = router;
