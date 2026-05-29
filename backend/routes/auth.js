const express = require('express');
const router = express.Router();
const { register, login, profile, updateProfile, updatePassword } = require('../controllers/authController');
const auth = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');

router.post('/register', validateRequest(['name', 'email', 'password']), register);
router.post('/login', validateRequest(['email', 'password']), login);
router.get('/profile', auth, profile);
router.put('/profile', auth, validateRequest(['name', 'email']), updateProfile);
router.put('/profile/password', auth, validateRequest(['currentPassword', 'newPassword']), updatePassword);

module.exports = router;
