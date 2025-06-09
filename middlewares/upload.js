const multer = require("multer");
const path = require("path");
const fs = require("fs");

const extensoesPermitidas = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

// Cria a pasta uploads se não existir
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Pasta uploads/ criada pelo multer.");
}

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (extensoesPermitidas.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não permitido. Envie uma imagem."), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const nomeArquivo = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, nomeArquivo);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB por arquivo
  },
});

module.exports = upload;
