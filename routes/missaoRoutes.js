const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const checkToken = require("../middlewares/checkToken");
const MissaoEnviada = require("../models/MissaoEnviada");

// Enviar missão
router.post(
  "/api/missoes/enviar",
  checkToken,
  upload.array("imagens"),
  async (req, res) => {
    try {
      const { titulo } = req.body;
      const usuarioId = req.userId;

      if (!usuarioId || !titulo || !req.files || req.files.length === 0) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
      }

      const imagens = req.files.map(file => file.filename);

      const novaMissao = new MissaoEnviada({
        usuario: usuarioId,
        titulo,
        imagem: imagens[0],  
      });

      await novaMissao.save();

      res.status(201).json({
        mensagem: "Missão enviada com sucesso.",
        dados: {
          usuarioId,
          titulo,
          imagens,
        },
      });
    } catch (erro) {
      console.error("Erro ao enviar missão:", erro);
      res.status(500).json({ mensagem: "Erro ao enviar missão." });
    }
  }
);

router.get("/api/missoes/pendentes", checkToken, async (req, res) => {
  try {
  
    const missoesPendentes = await MissaoEnviada.find({ status: "pendente" }).populate('usuario', 'nome');
    res.json(missoesPendentes);
  } catch (erro) {
    console.error("Erro ao buscar missões pendentes:", erro);
    res.status(500).json({ mensagem: "Erro ao buscar missões pendentes." });
  }
});


router.put("/api/missoes/:id/status", checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;


    if (!["aprovada", "rejeitada"].includes(status)) {
      return res.status(400).json({ mensagem: "Status inválido." });
    }

    const missao = await MissaoEnviada.findById(id);

    if (!missao) {
      return res.status(404).json({ mensagem: "Missão não encontrada." });
    }

    missao.status = status;
    await missao.save();

    res.json({ mensagem: `Missão ${status} com sucesso.` });
  } catch (erro) {
    console.error("Erro ao atualizar status da missão:", erro);
    res.status(500).json({ mensagem: "Erro ao atualizar status da missão." });
  }
});

module.exports = router;





