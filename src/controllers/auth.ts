/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config as dotEnvConfig } from 'dotenv';

import { ObjectId } from 'mongoose';
import CHARACTERS, { CONFIRM } from 'utils/constants';
import sendMail from './sendMail';
import User, { IUser } from '../models/user';
import DEV_JWT_SECRET from '../utils/devConfig';
import {
  UnauthorizedError, BadRequestError, ConflictError, NotFoundError,
} from '../errors';

dotEnvConfig();

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName, secondName, login, email, phone, avatar, password,
  } = req.body;

  let token = '';

  for (let i = 0; i < 25; i += 1) {
    token += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
  }

  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({
      firstName,
      secondName,
      login,
      email,
      phone,
      avatar,
      password: hash,
    }))
    .then((user: IUser | undefined) => {
      sendMail(email, token, login, CONFIRM);

      res.send({
        _id: user?._id,
        firstName,
        secondName,
        login,
        email,
        phone,
        avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError());
      }

      if (err.code === 11000) {
        next(new ConflictError('adding a user with an existing email'));
      }

      next(err);
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user: IUser | undefined) => {
      if (user?.status !== 'Active') {
        return next(new UnauthorizedError('PENDING_ACCOUNT_RU'));
      }
      const { JWT_SECRET, NODE_ENV } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV! === 'production' ? JWT_SECRET! : DEV_JWT_SECRET,
        { expiresIn: '7d' },
      );

      return res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({ message: 'successful authorization' });
      // return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('authorization with non-existent email and password')));
};

const confirmEmail = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ confirmationCode: req.params.confirmationCode })
    .then((user: (IUser & { _id: ObjectId; }) | null) => {
      if (!user) {
        return next(new NotFoundError('USER_NOT_FOUND_RU'));
      }

      if (user.status === 'Pending') {
        user.status = 'Active';
        user.save();

        return res.send('activated');
      }

      return res.status(409).send('409 conflict');
    })
    .catch((err) => {
      next(err);
    });
};

export { createUser, confirmEmail, login };
