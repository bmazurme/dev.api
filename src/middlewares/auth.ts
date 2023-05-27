import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { IUser } from '../models/user';
import { UnauthorizedError } from '../errors';

import { DEV_JWT_SECRET } from '../utils';

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const { token } = req.cookies as unknown as Record<string, string>;
  const { JWT_SECRET, NODE_ENV } = process.env;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV! === 'production' ? JWT_SECRET! : DEV_JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  (req as Request & { user: IUser }).user = payload as IUser;

  next();
};

export default auth;
