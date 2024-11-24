const express = require('express');
const { createCV, getAllVisibleCVs, deleteCV, updateVisibility, getCVDetails, getMyCVs, updateCV } = require('../controller/cv');
const authMiddleware = require('../midlleware/jws');

const router = express.Router();

// Route POST pour créer un CV
router.post('/', authMiddleware, createCV);

// Route GET pour récupérer tous les CV visibles
router.get('/', getAllVisibleCVs);

// Route PATCH pour modifier un CV
router.patch('/:id', authMiddleware, updateCV);

// Route PATCH pour modifier la visibilité d'un CV
router.patch('/:id/visibility', authMiddleware, updateVisibility);

// Route DELETE pour supprimer un CV par ID
router.delete('/:id', authMiddleware, deleteCV);

// Route GET pour récupérer les détails d'un CV
router.get('/:id', authMiddleware, getCVDetails);

// Route GET pour récupérer les CV de l'utilisateur connecté
router.get('/user/mine', authMiddleware, getMyCVs);

module.exports = router;



