const User = require("../models/User");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ mensagem: "Acesso negado. Admins apenas." });
    }
    next();
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor." });
  }
};

module.exports = isAdmin;
