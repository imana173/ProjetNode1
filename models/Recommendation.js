const mongoose = require('mongoose'); // Ajoutez cette ligne pour importer mongoose

const RecommendationSchema = new mongoose.Schema(
  {
    cv: { type: mongoose.Schema.Types.ObjectId, ref: 'CV', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Utilisateur qui a laissé la recommandation
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Recommendation = mongoose.model('Recommendation', RecommendationSchema);
module.exports = Recommendation;
