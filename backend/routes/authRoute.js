const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { login, checkAuth, logout } = require('../controllers/authController');

const router = express.Router();

//post api login

router.post('/login', login);
router.get('/checkAuth',authMiddleware ,checkAuth);
router.post('/logout', logout);

module.exports = router;