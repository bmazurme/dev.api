/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Books from '../models/book-model';

dotEnvConfig();

const addBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const book = req.body;
    const data = await Books.create({ ...book, userId: req.user._id });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getBooks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = req.body;
    const data = await Books.find({ projectId: project.id });

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Books.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Books.findByIdAndDelete(id);

    if (!data) {
      return next(new NotFoundError('Book not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

export {
  addBook, getBooks, updateBook, deleteBook,
};
