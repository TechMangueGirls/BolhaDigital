const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const checkToken = require("../middlewares/checkToken");
const MissaoEnviada = require("../models/MissaoEnviada");

router.post(
  "/api/missoes/enviar",
  checkToken,
  upload.array("imagens"),
  async (req, res) => {
    try {
      const { titulo } = req.body;
      const usuarioId = req.userId;

      if (!usuarioId || !titulo || !req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatórios." });
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

module.exports = router;




