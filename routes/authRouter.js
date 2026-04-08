const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Auth Routes
router.get('/me', authMiddleware, authController.me);
router.post('/register', authController.register);
router.post('/guest', authController.guest);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;