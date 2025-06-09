const express = require('express');
const router = express.Router();
const { votar, getVotacoes } = require('../controllers/voteController');
const requireAuth = require('../middlewares/checkToken');

router.get('/', getVotacoes);
router.post('/:id/votar', requireAuth, votar);

module.exports = router;
