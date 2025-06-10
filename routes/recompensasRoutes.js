const express = require('express');
const router = express.Router();
const User = require('../models/User');

const todasRecompensas = [
  { titulo: "Bolha", pontos: 150, iconUrl: "/assets/img/bolha.png" },
  { titulo: "Gamer", pontos: 500, iconUrl: "/assets/img/gamer.png" },
  { titulo: "Reino", pontos: 1000, iconUrl: "/assets/img/reino.png" },
  { titulo: "Artista", pontos: 800, iconUrl: "/assets/img/artista.png" },
  { titulo: "Postagem de Vídeo", pontos: 20000, iconUrl: "/assets/img/video.png" },
  { titulo: "Postagem de Imagens", pontos: 10000, iconUrl: "/assets/img/camera.png" },
];

router.post('/obter/:userId', async (req, res) => {
  const { userId } = req.params;
  const { titulo } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    if (user.recompensasObtidas.some(r => r.titulo === titulo))
      return res.status(400).json({ message: 'Recompensa já obtida.' });
    const recompensa = todasRecompensas.find(r => r.titulo === titulo);
    if (!recompensa) return res.status(400).json({ message: 'Recompensa não encontrada.' });
    if (user.pontos < recompensa.pontos)
      return res.status(400).json({ message: 'Pontos insuficientes.' });

    user.pontos -= recompensa.pontos;
    user.recompensasObtidas.push({
      titulo: recompensa.titulo,
      iconUrl: recompensa.iconUrl,
    });
    await user.save();
    res.status(200).json({ message: 'Recompensa obtida!', user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter recompensa.', error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    const obtidas = user.recompensasObtidas || [];
    const titulosObtidos = obtidas.map(r => r.titulo);
    const paraResgatar = todasRecompensas.filter(r => !titulosObtidos.includes(r.titulo));
    res.status(200).json({ obtidas, paraResgatar });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar recompensas.', error: err.message });
  }
});

router.put('/avatar/:userId', async (req, res) => {
  const { userId } = req.params;
  const { titulo } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const recompensa = user.recompensasObtidas.find(r => r.titulo === titulo);
    if (!recompensa) return res.status(400).json({ message: 'Recompensa não obtida.' });

    user.avatarSelecionado = recompensa;
    await user.save();

    res.status(200).json({ message: 'Avatar atualizado com sucesso!', user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar avatar.', error: err.message });
  }
});


router.get('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário.', error: err.message });
  }
});

module.exports = router;
