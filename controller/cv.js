const mongoose = require('mongoose');
const CV = require('../models/CV');

// Fonction pour créer un CV
const createCV = async (req, res) => {
    try {
      const userId = req.user.id;
      const { informationsPersonnelles, education, experience, visibilite } = req.body;
  
      // Validation des champs obligatoires
      if (!informationsPersonnelles || !informationsPersonnelles.prenom || !informationsPersonnelles.nom) {
        return res.status(400).json({ message: 'Les champs prénom et nom sont obligatoires.' });
      }
  
      // Vérification de l'existence d'un CV similaire
      const existingCV = await CV.findOne({
        user: userId,
        'informationsPersonnelles.prenom': informationsPersonnelles.prenom,
        'informationsPersonnelles.nom': informationsPersonnelles.nom,
        'informationsPersonnelles.description': informationsPersonnelles.description,
      });
  
      if (existingCV) {
        return res.status(400).json({ message: 'Un CV avec les mêmes informations existe déjà.' });
      }
  
      // Création du nouveau CV
      const newCV = new CV({
        user: userId,
        informationsPersonnelles,
        education, // Les sous-documents n'auront pas d'_id
        experience, // Les sous-documents n'auront pas d'_id
        visibilite,
      });
  
      await newCV.save();
  
      res.status(201).json({ message: 'CV créé avec succès', cv: newCV });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };
  

// Fonction pour récupérer tous les CV visibles
const getAllVisibleCVs = async (req, res) => {
  try {
    const cvs = await CV.find({ visibilite: true }).select(
      'informationsPersonnelles education experience visibilite'
    );

    if (!cvs.length) {
      return res.status(404).json({ message: 'Aucun CV visible trouvé.' });
    }

    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Fonction pour supprimer un CV
const deleteCV = async (req, res) => {
    try {
      const userId = req.user.id; // ID de l'utilisateur authentifié
      const cvId = req.params.id; // ID du CV à supprimer
  
      // Vérifie si l'ID du CV est valide
      if (!mongoose.Types.ObjectId.isValid(cvId)) {
        return res.status(400).json({ message: 'ID invalide.' });
      }
  
      // Recherche du CV et vérifie que l'utilisateur est bien le créateur
      const cv = await CV.findOne({ _id: cvId, user: userId });
  
      if (!cv) {
        return res.status(404).json({
          message: 'CV introuvable ou vous n\'êtes pas autorisé à le supprimer.',
        });
      }
  
      // Supprime le CV
      await CV.findByIdAndDelete(cvId);
  
      res.status(200).json({ message: 'CV supprimé avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };
  
// Fonction pour modifier la visibilité d'un CV
const updateVisibility = async (req, res) => {
    try {
      const userId = req.user.id; // Obtenu via le middleware d'authentification
      const cvId = req.params.id; // ID du CV
      const { visibilite } = req.body; // Nouvelle visibilité à appliquer
  
      // Vérifier si l'ID est valide
      if (!mongoose.Types.ObjectId.isValid(cvId)) {
        return res.status(400).json({ message: 'ID invalide.' });
      }
  
      // Trouver le CV et vérifier qu'il appartient à l'utilisateur
      const cv = await CV.findOne({ _id: cvId, user: userId });
  
      if (!cv) {
        return res.status(404).json({ message: 'CV introuvable ou non autorisé.' });
      }
  
      // Mettre à jour la visibilité
      cv.visibilite = visibilite;
      await cv.save();
  
      res.status(200).json({ message: 'Visibilité mise à jour avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };

  // Fonction pour récupérer les détails d'un CV visible
  const getCVDetails = async (req, res) => {
    try {
      const userId = req.user.id; // ID de l'utilisateur authentifié
      const cvId = req.params.id; // ID du CV à récupérer
  
      // Vérifier si l'ID du CV est valide
      if (!mongoose.Types.ObjectId.isValid(cvId)) {
        return res.status(400).json({ message: 'ID invalide.' });
      }
  
      // Chercher le CV
      const cv = await CV.findOne({ _id: cvId });
  
      // Si le CV n'existe pas
      if (!cv) {
        return res.status(404).json({ message: 'CV introuvable.' });
      }
  
      // Vérifier la visibilité
      if (!cv.visibilite && cv.user.toString() !== userId) {
        return res.status(404).json({ message: 'CV introuvable ou non visible.' });
      }
  
      // Retourner les détails du CV
      res.status(200).json({
        id: cv._id,
        prenom: cv.informationsPersonnelles.prenom,
        nom: cv.informationsPersonnelles.nom,
        description: cv.informationsPersonnelles.description,
        education: cv.education,
        experience: cv.experience,
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };


  const getMyCVs = async (req, res) => {
    try {
      // Obtenir l'ID utilisateur depuis le token JWT
      const userId = req.user.id;
  
      // Vérifier si l'utilisateur est authentifié
      if (!userId) {
        return res.status(401).json({ message: "Utilisateur non authentifié." });
      }
  
      console.log("Utilisateur connecté, ID :", userId); // Debugging log
  
      // Rechercher les CV de l'utilisateur connecté
      const cvs = await CV.find({ user: userId });
  
      // Si aucun CV trouvé, retourner une réponse appropriée
      if (!cvs || cvs.length === 0) {
        return res.status(404).json({ message: "Aucun CV trouvé pour cet utilisateur." });
      }
  
      // Retourner la liste des CV
      res.status(200).json(cvs);
    } catch (error) {
      console.error("Erreur serveur :", error.message); // Debugging log
      res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
  };
  
  
  
  
  module.exports = { createCV, getAllVisibleCVs, deleteCV, updateVisibility, getCVDetails, getMyCVs };
  
  

 
  
  

 