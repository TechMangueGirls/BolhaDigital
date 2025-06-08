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

// Editar postagem
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.userId;

    if (!content || content.trim() === '') {
      return res.status(422).json({ msg: 'Conteúdo é obrigatório!' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Postagem não encontrada!' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ msg: 'Você não tem permissão para editar essa postagem!' });
    }

    post.content = content;
    await post.save();

    const updatedPost = await Post.findById(postId).populate('author', 'username name');

    res.status(200).json({ msg: 'Postagem atualizada com sucesso!', post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar postagem!' });
  }
};

// Apagar postagem
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Postagem não encontrada!' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ msg: 'Você não tem permissão para apagar essa postagem!' });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ msg: 'Postagem apagada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao apagar postagem!' });
  }
};




