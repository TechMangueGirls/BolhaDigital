const mongoose = require("mongoose");

const MissaoEnviadaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  titulo: { type: String, required: true },
  imagens: [{ type: String, required: true }], 
  status: { type: String, default: "pendente" }, // ou: "aprovada", "rejeitada"
  pontos: { type: Number, default: 0 },
  dataEnvio: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MissaoEnviada", MissaoEnviadaSchema);

