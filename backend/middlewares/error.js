module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  let code = statusCode;
  let text = message;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    code = 400;
    text = (err.name === 'ValidationError') ? 'Некорректные данные' : 'Невалидный id';
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    code = 409;
    text = 'Пользователь с такой почтой уже существует';
  }
  res.status(code).send({ message: (code === 500) ? 'Ошибка на сервере' : text });
  next();
};
