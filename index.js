const express = require('express');
const connectDB = require('./config/configdb'); // Connexion à MongoDB

const authRouter = require('./router/auth'); // Routeur pour l'authentification
const cvRouter = require('./router/cv');
const recommendationRouter = require('./router/recommendation');
const userRouter = require('./router/user');

const app = express(); // Créer une instance d'application Express
const port = 5000; // Définir le port d'écoute

// Connexion à MongoDB
connectDB();

// Middleware pour analyser les données JSON
app.use(express.json());


// Routes pour l'authentification
app.use('/auth', authRouter);

// Routes pour les CV
app.use('/api/cv', cvRouter);

app.use('/api/recommendations', recommendationRouter);
// Ajouter les routes utilisateur
app.use('/api/user', userRouter);


// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

