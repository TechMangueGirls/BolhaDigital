const mongoose = require('mongoose');

const votacaoSchema = new mongoose.Schema({
  frase: { type: String, required: true },
  votosPositivos: { type: Number, default: 0 },
  votosNegativos: { type: Number, default: 0 },
  votantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Votacao', votacaoSchema);
