const multer = require('multer');
const path = require('path');

const extensoesPermitidas = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

const storage = multer.memoryStorage();

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
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB por arquivo
});

module.exports = upload;
