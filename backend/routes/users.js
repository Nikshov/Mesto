const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlValidator = require('../constants/urlValidator4Joi');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getActualUser,
  approveCheck,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', approveCheck);
router.get('/me', getActualUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(urlValidator),
  }),
}), updateAvatar);

module.exports = router;
