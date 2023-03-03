import { celebrate, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
// import validator from 'validator';

import { BadRequestError } from '../errors';

// const checkUrl = (value: string, helpers: Record<string, (m: string) => void>) => {
//   if (validator.isURL(value)) {
//     return value;
//   }

//   return helpers.message('поле заполнено некорректно');
// };

const StringRequired = Joi.string().required();

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: StringRequired.custom((value) => {
      if (!isValidObjectId(value)) {
        throw new BadRequestError('переданы некорректные данные');
      }

      return value;
    }),
  }),
});

const validateUserData = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(30),
    secondName: Joi.string().min(2).max(30),
    login: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    phone: Joi.string().min(2),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().min(2),
  }),
});

const validatePassword = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validateLoginData = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateRegistrData = celebrate({
  body: Joi.object().keys({
    firstName: Joi.string().min(2).max(30),
    secondName: Joi.string().min(2).max(30),
    login: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    phone: Joi.string().min(2),
    avatar: Joi.string().min(2),
    password: Joi.string().required(),
  }),
});

export {
  validateObjectId,
  validateUserData,
  validateLoginData,
  validateRegistrData,
  validateUserAvatar,
  validatePassword,
};
