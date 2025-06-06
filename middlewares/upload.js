const multer = require("multer");
const path = require("path");

const extensoesPermitidas = [".png", ".jpg", ".jpeg", ".gif", ".webp"];

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
    cb(null, "uploads/");
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
