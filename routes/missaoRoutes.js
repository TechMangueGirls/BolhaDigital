const express = require("express");
const multer = require("multer");
const upload = require("../middlewares/upload");
const checkToken = require("../middlewares/checkToken");
const checkAdmin = require("../middlewares/checkAdmin");
const MissaoEnviada = require("../models/MissaoEnviada");
const User = require("../models/User");

const router = express.Router();

// POST: Enviar missão com até 4 imagens
router.post(
  "/enviar",
  checkToken,
  (req, res, next) => {
    upload.array("imagens", 4)(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({ mensagem: "Cada imagem deve ter no máximo 10MB." });
        }
        return res.status(400).json({ mensagem: "Erro no envio das imagens.", erro: err.message });
      } else if (err) {
        return res.status(500).json({ mensagem: "Erro inesperado no upload.", erro: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const { titulo } = req.body;
      const usuarioId = req.userId;

      if (!usuarioId || !titulo || !req.files || req.files.length === 0) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
      }

      const imagens = req.files.map((file) => file.filename);

      const novaMissao = new MissaoEnviada({
        usuario: usuarioId,
        titulo,
        imagens,
      });

      await novaMissao.save();

      res.status(201).json({
        mensagem: "Missão enviada com sucesso.",
        dados: { usuarioId, titulo, imagens },
      });
    } catch (erro) {
      console.error("Erro ao enviar missão:", erro.message);
      res.status(500).json({ mensagem: "Erro ao enviar missão." });
    }
  }
);

// GET /api/missoes/pendentes  - apenas admins
router.get(
  "/pendentes",
  checkToken,
  checkAdmin,
  async (req, res) => {
    try {
      const missoesPendentes = await MissaoEnviada.find({ status: "pendente" }).populate("usuario", "name username");
      res.json(missoesPendentes);
    } catch (e) {
      console.error(e);
      res.status(500).json({ mensagem: "Erro ao buscar missões pendentes." });
    }
  }
);

// PUT /api/missoes/:id/status  - apenas admins
router.put(
  "/:id/status",
  checkToken,
  checkAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body; // Espera "aprovada" ou "rejeitada"

      if (!["aprovada", "rejeitada"].includes(status)) {
        return res.status(400).json({ mensagem: "Status inválido." });
      }

      const missao = await MissaoEnviada.findById(id);
      if (!missao) return res.status(404).json({ mensagem: "Missão não encontrada." });
      if (missao.status !== "pendente") return res.status(400).json({ mensagem: "Missão já avaliada." });

      missao.status = status;

      if (status === "aprovada") {
        missao.pontos = 100;
        await User.findByIdAndUpdate(missao.usuario, { $inc: { pontos: 100 } });
      }

      await missao.save();
      res.json({ mensagem: `Missão ${status} com sucesso.` });
    } catch (e) {
      console.error(e);
      res.status(500).json({ mensagem: "Erro ao atualizar status da missão." });
    }
  }
);

module.exports = router;

