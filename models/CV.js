const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    diplome: { type: String, required: true },
    institution: { type: String, required: true },
    annee: { type: Number, required: true },
  },
  { _id: false } // Désactiver l'ajout automatique de `_id` dans les sous-documents
);

const ExperienceSchema = new mongoose.Schema(
  {
    poste: { type: String, required: true },
    entreprise: { type: String, required: true },
    duree: { type: String, required: true },
    taches: { type: String, required: true },
  },
  { _id: false } // Désactiver l'ajout automatique de `_id` dans les sous-documents
);

const InformationsPersonnellesSchema = new mongoose.Schema(
  {
    prenom: { type: String, required: true },
    nom: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const CVSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  informationsPersonnelles: { type: InformationsPersonnellesSchema, required: true },
  education: { type: [EducationSchema], required: true },
  experience: { type: [ExperienceSchema], required: true },
  visibilite: { type: Boolean, default: true },
});

const CV = mongoose.model('CV', CVSchema);

module.exports = CV;
