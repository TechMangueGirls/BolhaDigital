require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const missaoRoutes = require('./routes/missaoRoutes');
const recompensasRoutes = require('./routes/recompensasRoutes');
const votacaoRoutes = require('./routes/votacaoRoutes');
const bioRoutes = require('./routes/bioRoutes');

const { criarFrasesIniciais } = require('./controllers/voteController');

const app = express();

// Garante que a pasta uploads existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS configurado 
const allowedOrigins = [
  'https://bolha-digital1.onrender.com',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Aplica CORS
app.use(cors(corsOptions));

// Aplica express.json() com limite aumentado, exceto para multipart/form-data
app.use((req, res, next) => {
  if (req.is('multipart/form-data')) return next();
  express.json({ limit: "50mb" })(req, res, next);
});

// Serve arquivos enviados em /uploads
app.use('/uploads', express.static(uploadDir));

// Função para conectar DB, criar frases e iniciar servidor
async function startServer() {
  try {
    await connectDB();
    await criarFrasesIniciais();

    // Rotas da aplicação
    app.use(authRoutes);
    app.use(postRoutes);
    app.use('/api/missoes', missaoRoutes);
    app.use('/api/recompensas', recompensasRoutes);
    app.use('/api/votacoes', votacaoRoutes);
    app.use('/api/bio', bioRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();
