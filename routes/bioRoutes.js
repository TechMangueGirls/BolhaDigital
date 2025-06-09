const express = require('express');
const router = express.Router();
const checkToken = require('../middlewares/checkToken');
const { getBio, updateBio } = require('../controllers/bioController');

router.get('/', checkToken, getBio);
router.put('/', checkToken, updateBio);

module.exports = router;
