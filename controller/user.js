const User = require('../models/User');

// Modifier les informations personnelles
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // ID de l'utilisateur authentifié
    const { firstname, lastname, email } = req.body;

    // Mise à jour des informations utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname, lastname, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({
      message: "Informations personnelles mises à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

module.exports = { updateUserInfo };
