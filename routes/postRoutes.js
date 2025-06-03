const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkToken = require('../middlewares/checkToken');
const offensiveWordFilter = require('../middlewares/offensiveWordFilter');

// Rota POST para criar postagem protegida
router.post('/posts', checkToken, offensiveWordFilter, postController.createPost);

// Rota GET para listar posts
router.get('/posts', postController.getAllPosts);

module.exports = router;



