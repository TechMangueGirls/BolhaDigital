const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, username, email, dob, password, confirmpassword } = req.body;

  if (!name || !username || !email || !dob || !password || !confirmpassword) {
    return res.status(422).json({ msg: 'Todos os campos são obrigatórios!' });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: 'As senhas não conferem!' });
  }

  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro email!' });
  }

  if (usernameExists) {
    return res.status(422).json({ msg: 'Nome de usuário já está em uso!' });
  }

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    username,
    email,
    dob,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro no servidor. Tente novamente mais tarde.' });
  }
};

exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(422).json({ msg: 'Email/Username e senha são obrigatórios!' });
  }

  const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida!' });
  }

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);
    res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao gerar o token!' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId, '-password');
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado!' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar usuário' });
  }
};
