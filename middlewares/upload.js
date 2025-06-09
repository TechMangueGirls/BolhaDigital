const multer = require('multer');
const path = require('path');
const fs = require('fs');

const extensoesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const nomeArquivo = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, nomeArquivo);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (extensoesPermitidas.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Envie uma imagem.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 10MB
});

module.exports = upload;
