const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.zaje6ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster`
    );
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
  }
}

module.exports = connectDB;
