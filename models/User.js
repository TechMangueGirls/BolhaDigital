const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'], // papéis permitidos
    default: 'user', // valor padrão
  },
});

module.exports = mongoose.model('User', userSchema);
