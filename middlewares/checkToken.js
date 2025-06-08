const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1]; // Espera formato: Bearer <token>

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado! Token não encontrado." });
  }

  try {
    const secret = process.env.SECRET;
    if (!secret) {
      console.error("Chave secreta JWT não configurada (process.env.SECRET)");
      return res.status(500).json({ msg: "Erro interno no servidor" });
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id; 
    next(); 
  } catch (error) {
    console.error("❌ Erro ao verificar token:", error.message);
    return res.status(401).json({ msg: "Token inválido!" });
  }
}

module.exports = checkToken;




