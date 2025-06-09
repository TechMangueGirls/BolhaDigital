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

const app = express();

// *** Garantir que a pasta uploads existe ***
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Pasta uploads/ criada.');
} else {
  console.log('Pasta uploads/ já existe.');
}

// Domínios permitidos para CORS
const allowedOrigins = [
  'https://bolha-digital1.onrender.com',
  'http://localhost:3000',
];

// Configurações CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permite requests sem origem (como postman, curl) ou da lista permitida
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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Expor pasta uploads como estática para servir arquivos enviados
app.use('/uploads', express.static(uploadDir));

// Conexão com o banco de dados MongoDB
connectDB();

// Rotas da aplicação
app.use(authRoutes);
app.use(postRoutes);
app.use('/api/missoes', missaoRoutes);
app.use('/api/recompensas', recompensasRoutes);

// Inicialização do servidor na porta definida no .env ou 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
