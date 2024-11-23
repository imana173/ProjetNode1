const express = require('express');
const { createCV, getAllVisibleCVs, deleteCV, updateVisibility, getCVDetails, getMyCVs } = require('../controller/cv');
const authMiddleware = require('../midlleware/jws'); // Middleware pour protéger certaines routes

const router = express.Router();

// Route POST pour créer un CV
router.post('/', authMiddleware, createCV);

// Route GET pour récupérer tous les CV visibles
router.get('/', getAllVisibleCVs);
// Route PATCH /api/cv/:id/visibility - Modifier la visibilité d'un CV
router.patch('/:id/visibility', authMiddleware, updateVisibility);


// Route DELETE pour supprimer un CV par ID
router.delete('/:id', authMiddleware, deleteCV);


router.get('/:id',authMiddleware, getCVDetails);
router.get('/user/mine', authMiddleware, getMyCVs);

module.exports = router;



