const User = require('../models/User');

const getBio = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('bio');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ bio: user.bio || '' });
  } catch (err) {
    console.error('Erro ao buscar bio:', err);
    res.status(500).json({ message: 'Erro ao buscar bio.' });
  }
};

const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { bio },
      { new: true, runValidators: true }
    ).select('bio');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ message: 'Bio atualizada com sucesso!', bio: updatedUser.bio });
  } catch (err) {
    console.error('Erro ao atualizar bio:', err);
    res.status(500).json({ message: 'Erro ao atualizar bio.' });
  }
};

module.exports = {
  getBio,
  updateBio,
};
