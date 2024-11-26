const express = require('express');
const authMiddleware = require('../midlleware/jws');
const {
  updateUserInfo,
  deleteReceivedRecommendation,
} = require('../controller/user');

const router = express.Router();

// Route pour modifier les informations personnelles
router.patch('/', authMiddleware, updateUserInfo);


module.exports = router;