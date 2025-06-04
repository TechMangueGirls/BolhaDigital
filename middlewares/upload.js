const multer = require("multer");
const path = require("path");

// Extensões permitidas
const extensoesPermitidas = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

// Filtro de arquivos para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (extensoesPermitidas.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não permitido. Envie uma imagem."), false);
  }
};

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const nomeArquivo = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, nomeArquivo);
  },
});

// Configuração final do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
});

module.exports = upload;
