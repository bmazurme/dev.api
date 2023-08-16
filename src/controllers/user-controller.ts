import { NextFunction, Request, Response } from 'express';

import User, { IUser } from '../models/user-model';
import { NotFoundError, BadRequestError, ConflictError } from '../errors';

const getCurrentUser = (req: unknown, res: Response, next: NextFunction) => {
  User.findById((req as { user: User & { _id: number } }).user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('пользователь не найден'));
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError());
      }

      next(err);
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName, secondName, login, email, phone,
  } = req.body;

  User.findByIdAndUpdate(
    (req as Request & { user: IUser }).user._id,
    {
      firstName, secondName, login, email, phone,
    },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('USER_NOT_FOUND_RU'));
      }

      return res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
      }

      if (err.code === 11000) {
        return next(new ConflictError('USER_CONFLICT_RU'));
      }

      return next(err);
    });
};

const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    (req as Request & { user: IUser }).user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('USER_NOT_FOUND_RU'));
      }

      return res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError());
      }

      if (err.code === 11000) {
        return next(new ConflictError('USER_CONFLICT_RU'));
      }

      return next(err);
    });
};

const logout = (req: Request, res: Response) => res.clearCookie('token', { path: '/' }).send('logout');

export {
  getCurrentUser, updateUser, updateUserAvatar, logout,
};
