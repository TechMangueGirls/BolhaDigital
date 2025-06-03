const offensiveWords = require('../utils/offensiveWords');

function offensiveWordFilter(req, res, next) {
  const { content } = req.body;

  if (!content) return res.status(400).json({ msg: 'Conteúdo é obrigatório!' });

  const lowerContent = content.toLowerCase();
  const found = offensiveWords.some(word => lowerContent.includes(word));

  if (found) {
    return res.status(422).json({ msg: 'Não é possível enviar: palavra ofensiva detectada!' });
  }

  next();
}

module.exports = offensiveWordFilter;



