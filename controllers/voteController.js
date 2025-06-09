const Votacao = require('../models/Votacao');
const User = require('../models/User');

// Frases que vão ser criadas se não existirem
const frasesIniciais = [
  "Você sabia que a Lei 14.811/2024 trouxe punições mais rigorosas para quem pratica bullying, tanto no ambiente físico quanto no virtual?",
  "Você sabia que, além da prisão, o bullying e o cyberbullying podem gerar multas para os agressores, conforme a nova lei brasileira?",
  "Você sabia que a Lei 14.811/2024 reconhece o sequestro e cárcere privado de menores como crimes hediondos, com penalidades severas?",
  "Você sabia que induzir um jovem à automutilação passou a ser crime hediondo com a nova legislação contra bullying e cyberbullying?",
];

// Função para criar frases iniciais no banco se não existirem
async function criarFrasesIniciais() {
  try {
    for (const frase of frasesIniciais) {
      const existe = await Votacao.findOne({ frase });
      if (!existe) {
        await Votacao.create({ frase });
        console.log(`Frase criada: "${frase}"`);
      }
    }
    console.log("Frases iniciais garantidas no banco.");
  } catch (err) {
    console.error("Erro ao criar frases iniciais:", err);
  }
}

// POST /api/votacoes/:id/votar
const votar = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;
  const userId = req.userId; // <- corrigido aqui

  if (!userId) {
    return res.status(401).json({ error: 'Usuário não autenticado.' });
  }

  if (!['positivo', 'negativo'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de voto inválido.' });
  }

  try {
    const votacao = await Votacao.findById(id);
    if (!votacao) return res.status(404).json({ error: 'Frase não encontrada.' });

    if (votacao.votantes.includes(userId)) {
      return res.status(400).json({ error: 'Você já votou nesta frase.' });
    }

    if (tipo === 'positivo') {
      votacao.votosPositivos++;
    } else {
      votacao.votosNegativos++;
    }

    votacao.votantes.push(userId);
    await votacao.save();

    const user = await User.findById(userId);
    user.pontos += 25;
    await user.save();

    const total = votacao.votosPositivos + votacao.votosNegativos;
    const porcentagemPositiva = total ? (votacao.votosPositivos / total) * 100 : 0;
    const porcentagemNegativa = total ? (votacao.votosNegativos / total) * 100 : 0;

    res.status(200).json({
      votosPositivos: votacao.votosPositivos,
      votosNegativos: votacao.votosNegativos,
      porcentagemPositiva,
      porcentagemNegativa,
      message: 'Voto registrado com sucesso!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar o voto.' });
  }
};

// GET /api/votacoes
const getVotacoes = async (req, res) => {
  try {
    const votacoes = await Votacao.find().lean();
    res.status(200).json(votacoes);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar votações.' });
  }
};

module.exports = { votar, getVotacoes, criarFrasesIniciais };
