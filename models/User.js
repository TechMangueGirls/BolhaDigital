const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user',
  },
  pontos: { type: Number, default: 0 },

  recompensasObtidas: [
    {
      titulo: { type: String, required: true },
      iconUrl: { type: String }, 
    }
  ],

  avatarSelecionado: {
    titulo: { type: String },
    iconUrl: { type: String },
  },

  votacoesRespondidas: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Votacao' }
  ],
});

module.exports = mongoose.model('User', userSchema);
