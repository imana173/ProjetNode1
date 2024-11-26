const Recommendation = require('../models/Recommendation');
const CV = require('../models/CV');

// Ajouter une recommandation à un CV
const addRecommendation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cvId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Le message est obligatoire.' });
    }

    const cv = await CV.findById(cvId);

    if (!cv || !cv.visibilite) {
      return res.status(404).json({ message: 'CV introuvable ou non visible.' });
    }

    const recommendation = new Recommendation({
      cv: cvId,
      user: userId,
      message,
    });

    await recommendation.save();

    res.status(201).json({ message: 'Recommandation ajoutée avec succès.', recommendation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les recommandations pour un CV
const getRecommendationsForCV = async (req, res) => {
  try {
    const { cvId } = req.params;

    const recommendations = await Recommendation.find({ cv: cvId }).populate('user', 'firstname lastname email');

    if (!recommendations.length) {
      return res.status(404).json({ message: 'Aucune recommandation trouvée pour ce CV.' });
    }

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Récupérer les recommandations reçues par un utilisateur
const getRecommendationsForUser = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // Récupérer tous les CV appartenant à l'utilisateur
      const cvs = await CV.find({ user: userId }).select('_id');
  
      if (!cvs || cvs.length === 0) {
        return res.status(404).json({ message: "Aucun CV trouvé pour cet utilisateur." });
      }
  
      // Extraire les IDs des CV
      const cvIds = cvs.map((cv) => cv._id);
  
      // Récupérer les recommandations associées aux IDs de CV
      const recommendations = await Recommendation.find({ cv: { $in: cvIds } })
        .populate('user', 'firstname lastname email') // Utilisateur ayant laissé la recommandation
        .populate('cv', 'informationsPersonnelles'); // Détails du CV
  
      if (recommendations.length === 0) {
        return res.status(404).json({ message: "Aucune recommandation trouvée pour vos CV." });
      }
  
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: 'Erreur serveur.', error: error.message });
    }
  };
  
// Supprimer une recommandation
const deleteRecommendation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const recommendation = await Recommendation.findById(id);

    if (!recommendation) {
      return res.status(404).json({ message: 'Recommandation introuvable.' });
    }

    const cv = await CV.findById(recommendation.cv);

    if (cv.user.toString() !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette recommandation.' });
    }

    await Recommendation.findByIdAndDelete(id);

    res.status(200).json({ message: 'Recommandation supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

module.exports = {
  addRecommendation,
  getRecommendationsForCV,
  getRecommendationsForUser,
  deleteRecommendation,
};
