const express = require('express');
const cors = require('cors'); // Importer le middleware CORS
const connectDB = require('./config/configdb'); // Connexion à MongoDB

const authRouter = require('./router/auth'); // Routeur pour l'authentification
const cvRouter = require('./router/cv');
const recommendationRouter = require('./router/recommendation');
const userRouter = require('./router/user');

const app = express(); // Créer une instance d'application Express
const port = 5000; // Définir le port d'écoute

// Connexion à MongoDB
connectDB();

// Middleware CORS
app.use(cors({
  origin: "https://frontgencv-project.onrender.com", // URL du frontend déployé
  methods: ["GET", "POST", "PATCH", "DELETE"], // Méthodes HTTP autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
}));

// Middleware pour analyser les données JSON
app.use(express.json());

// Routes pour l'authentification
app.use('/auth', authRouter);

// Routes pour les CV
app.use('/api/cv', cvRouter);

// Routes pour les recommandations
app.use('/api/recommendations', recommendationRouter);

// Ajouter les routes utilisateur
app.use('/api/user', userRouter);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});


