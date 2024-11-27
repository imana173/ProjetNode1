const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controller/auth'); // Importer les contrôleurs
const authMiddleware = require('../midlleware/jws');

// Route POST /auth/register - Inscription
router.post('/register', register);

// Route POST /auth/login - Connexion
router.post('/login', login);

// Route GET /auth/me - Récupérer les informations de l'utilisateur connecté
router.get('/me', authMiddleware, getUserDetails);



module.exports = router; // Exporter correctement le routeur

