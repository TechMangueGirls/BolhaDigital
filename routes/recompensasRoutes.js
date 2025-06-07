const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Recompensas disponíveis (sem iconUrl, só dados básicos)
const todasRecompensas = [
  { titulo: "Bolha", pontos: 500 },
  { titulo: "Gamer", pontos: 700 },
  { titulo: "Reino", pontos: 5000 },
  { titulo: "Artista", pontos: 1500 },
  { titulo: "Postagem de Vídeo", pontos: 20000, icon: "🎬" },
  { titulo: "Postagem de Imagens", pontos: 10000, icon: "📸" },
];

// 1. Adicionar recompensa ao usuário (com verificação de pontos)
router.post('/obter/:userId', async (req, res) => {
  const { userId } = req.params;
  const { titulo } = req.body;

  try {
    const user = await User.findById(userId);

    const jaTem = user.recompensasObtidas.some(r => r.titulo === titulo);
    if (jaTem) {
      return res.status(400).json({ message: 'Recompensa já obtida.' });
    }

    const recompensa = todasRecompensas.find(r => r.titulo === titulo);
    if (!recompensa) {
      return res.status(400).json({ message: 'Recompensa não encontrada.' });
    }

    if (user.pontos < recompensa.pontos) {
      return res.status(400).json({ message: 'Pontos insuficientes para obter esta recompensa.' });
    }

    user.pontos -= recompensa.pontos;
    user.recompensasObtidas.push({ 
      titulo: recompensa.titulo, 
      icon: recompensa.icon || null
    });

    await user.save();

    res.status(200).json({
      message: 'Recompensa obtida com sucesso!',
      user
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter recompensa.', error: err.message });
  }
});

// 2. Rota GET que retorna recompensas obtidas e para resgatar
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    const obtidas = user.recompensasObtidas || [];
    const titulosObtidos = obtidas.map(r => r.titulo);

    const paraResgatar = todasRecompensas.filter(r => !titulosObtidos.includes(r.titulo));

    res.status(200).json({ obtidas, paraResgatar });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar recompensas.', error: err.message });
  }
});

// 3. Selecionar avatar a partir das recompensas obtidas
router.put('/avatar/:userId', async (req, res) => {
  const { userId } = req.params;
  const { titulo } = req.body;

  try {
    const user = await User.findById(userId);

    const recompensa = user.recompensasObtidas.find(r => r.titulo === titulo);
    if (!recompensa) {
      return res.status(400).json({ message: 'Recompensa não encontrada entre as obtidas.' });
    }

    user.avatarSelecionado = recompensa;
    await user.save();

    res.status(200).json({ message: 'Avatar atualizado com sucesso!', avatar: recompensa });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar avatar.', error: err.message });
  }
});

module.exports = router;
