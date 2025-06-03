const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkToken = require('../middlewares/checkToken');

// Rota POST para criar postagem protegida
router.post('/posts', checkToken, postController.createPost);

// Rota GET para listar posts
router.get('/posts', postController.getAllPosts);

module.exports = router;



