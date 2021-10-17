require('dotenv').config();
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const DuplicateError = require('../constants/duplicateError');
const NotFoundError = require('../constants/notFoundError');
const UnauthorizedError = require('../constants/unauthorizedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким ID не найден.');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new DuplicateError('Пользователь с такой почтой уже существует'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(200).send({ message: 'пользователь успешно зарегистрирован' }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с таким ID не найден.');
      return res.status(200).send(user);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь с таким ID не найден.');
      return res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) throw new UnauthorizedError('Неправильные почта или пароль');
      bcrypt.compare(password, user.password)
        .then((m) => {
          if (!m) throw new UnauthorizedError('Неправильные почта или пароль');
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret',
            { expiresIn: '7d' });
          const { _doc } = { ...user };
          delete _doc.password;
          res
            .status(200)
            .cookie('token', token, {
              maxAge: 604800000, httpOnly: true, sameSite: 'Strict', secure: true,
            })
            .send(_doc);
        })
        .catch(next);
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.status(200).cookie('token', '', {
    maxAge: -1, httpOnly: true, sameSite: 'Strict', secure: true,
  }).send({});
};

const getActualUser = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const approveCheck = (req, res) => {
  res.status(200).send({});
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateAvatar,
  updateUser,
  login,
  getActualUser,
  logOut,
  approveCheck,
};
