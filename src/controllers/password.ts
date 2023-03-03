/* eslint-disable no-param-reassign */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User, { IUser } from '../models/user';
import sendMail from './sendMail';

const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RESET = 2;

const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password, newPassword, email } = req.body;

  User.findUserByCredentials(email, password)
    .then((user: IUser | undefined) => {
      bcrypt.hash(newPassword, 10)
        .then((hash: string) => {
          (user as IUser).password = hash;
          user?.save();
          const { login, _id } = user!;
          res.send({ email, login, id: _id });
        });
    })
    .catch((err) => {
      next(err);
    });
};

const resetPassword = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  User.findOne({ email })
    .then((user: IUser | null | undefined) => {
      let token = '';

      for (let i = 0; i < 25; i += 1) {
        token += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }

      const { login } = user!;
      user!.confirmationCode = token;

      user!.save();
      sendMail(email, token, login, RESET);

      return res.send({ message: 'message was sent' });
    })
    .catch(next);
};

const newPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password, token } = req.body;
  User.findOne({
    confirmationCode: token,
  })
    .then((user: IUser | null | undefined) => {
      bcrypt.hash(password, 10)
        .then((hash: string) => {
          user!.password = hash;
          user!.confirmationCode = user!.email;
          user!.save();

          return res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

export { updatePassword, resetPassword, newPassword };
