require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

const allowedOrigins = ['https://bolha-digital1.onrender.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); 
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `O CORS não permite esta origem: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use((err, req, res, next) => {
  if (err instanceof Error && err.message.startsWith('O CORS')) {
    return res.status(403).json({ msg: err.message });
  }
  next(err);
});

app.use(express.json());
app.use(authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

