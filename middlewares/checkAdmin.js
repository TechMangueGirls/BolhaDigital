const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    if (!req.userId) return res.status(401).json({ mensagem: "Usuário não autenticado." });

    const user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ mensagem: "Usuário não encontrado." });

    if (user.role === "admin") return next();

    return res.status(403).json({ mensagem: "Acesso restrito a administradores." });
  } catch (error) {
    console.error("Erro no checkAdmin:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
};
