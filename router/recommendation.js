const express = require('express');
const {
  addRecommendation,
  getRecommendationsForCV,
  getRecommendationsForUser,
  deleteRecommendation,
} = require('../controller/recommendation');
const authMiddleware = require('../midlleware/jws'); // Assurez-vous que le middleware est bien configuré

const router = express.Router();

// Route pour ajouter une recommandation
router.post('/:cvId', authMiddleware, addRecommendation);

// Route pour récupérer les recommandations pour un CV
router.get('/:cvId', authMiddleware, getRecommendationsForCV);

// Route pour récupérer les recommandations reçues par un utilisateur
router.get('/user', authMiddleware, getRecommendationsForUser);

// Route pour supprimer une recommandation
router.delete('/:id', authMiddleware, deleteRecommendation);

module.exports = router;
