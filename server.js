require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const missaoRoutes = require('./routes/missaoRoutes');
const recompensasRoutes = require('./routes/recompensasRoutes');

const app = express();

// Domínios permitidos
const allowedOrigins = [
  'https://bolha-digital1.onrender.com', 
  'http://localhost:3000',               
];

// Configurações CORS
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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Pasta para arquivos enviados
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexão com o banco
connectDB();

// Rotas
app.use(authRoutes);
app.use(postRoutes);
app.use(missaoRoutes);
app.use('/api/missoes', missaoRoutes);
app.use('/api/recompensas', recompensasRoutes);

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));



