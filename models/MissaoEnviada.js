const mongoose = require("mongoose");

const ImagemSchema = new mongoose.Schema({
  mimetype: String,
  buffer: Buffer,
});

const MissaoEnviadaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  titulo: { type: String, required: true },
  imagens: [ImagemSchema], // Subdocumentos com mimetype e buffer
  status: { type: String, default: "pendente" },
  pontos: { type: Number, default: 0 },
  dataEnvio: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MissaoEnviada", MissaoEnviadaSchema);
