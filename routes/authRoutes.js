const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkToken = require('../middlewares/checkToken');

// Rota principal
router.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem-vindo à nossa API' });
});

// Rota para obter os dados do usuário autenticado (usada no frontend)
router.get('/user/me', checkToken, authController.getUser);

// Rota para buscar qualquer usuário pelo ID (pode manter se for usar em outro lugar)
router.get('/user/:id', checkToken, authController.getUser);

// Rota de registro
router.post('/auth/register', authController.register);

// Rota de login
router.post('/auth/login', authController.login);

module.exports = router;


