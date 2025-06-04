const express = require("express");
const router = express.Router();

const MissaoEnviada = require("../models/MissaoEnviada");
const User = require("../models/User");

// Rota para listar missões pendentes
router.get("/api/admin/missoes/pendentes", async (req, res) => {
  try {
    const missoesPendentes = await MissaoEnviada.find({ status: "pendente" }).populate("usuario", "name username email");
    res.json(missoesPendentes);
  } catch (error) {
    console.error("Erro ao listar missões pendentes:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// Rota para aprovar ou reprovar missão e adicionar pontos ao usuário
router.put("/api/admin/missoes/:id/avaliar", async (req, res) => {
  const { id } = req.params;
  const { status, pontos } = req.body; // status deve ser 'aprovada' ou 'rejeitada'

  if (!["aprovada", "rejeitada"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  try {
    const missao = await MissaoEnviada.findById(id);
    if (!missao) {
      return res.status(404).json({ error: "Missão não encontrada" });
    }

    if (missao.status !== "pendente") {
      return res.status(400).json({ error: "Missão já foi avaliada" });
    }

    missao.status = status;
    if (status === "aprovada") {
      missao.pontos = pontos || 0;
      // Adicionar pontos ao usuário
      const user = await User.findById(missao.usuario);
      if (user) {
        user.pontos = (user.pontos || 0) + missao.pontos;
        await user.save();
      }
    }

    await missao.save();

    res.json({ message: `Missão ${status} com sucesso`, missao });
  } catch (error) {
    console.error("Erro ao avaliar missão:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
