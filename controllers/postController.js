const Post = require('../models/Post');
const User = require('../models/User');

// Criar nova postagem
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const authorId = req.userId;

    if (!content || content.trim() === '') {
      return res.status(422).json({ msg: 'Conteúdo é obrigatório!' });
    }

    const post = new Post({
      content,
      author: authorId,
      hasOffensiveWords: req.hasOffensiveWords || false,
    });

    await post.save();

    // Popula o campo 'author' para retornar nome e username junto com a postagem
    const populatedPost = await Post.findById(post._id).populate('author', 'username name');

    const response = {
      msg: 'Postagem criada com sucesso!',
      post: populatedPost,
    };

    if (req.offensiveWarning) {
      response.alert = req.offensiveWarning;
    }

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao criar postagem!' });
  }
};

// Listar todas postagens
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username name')
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar postagens!' });
  }
};



