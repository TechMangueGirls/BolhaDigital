const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const checkToken = require('../middlewares/checkToken');

// Criar postagem (protegida)
router.post('/posts', checkToken, postController.createPost);

// Listar todas as postagens (pública)
router.get('/posts', postController.getAllPosts);

// Editar uma postagem (protegida)
router.put('/posts/:id', checkToken, postController.updatePost);

// Deletar uma postagem (protegida)
router.delete('/posts/:id', checkToken, postController.deletePost);

module.exports = router;




