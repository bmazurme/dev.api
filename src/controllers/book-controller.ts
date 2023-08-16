/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Books from '../models/book-model';

dotEnvConfig();

const addBook = (req: any, res: Response, next: NextFunction) => {
  const book = req.body;

  Books.create({ ...book, userId: req.user._id })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

const getBooks = (req: any, res: Response, next: NextFunction) => {
  const project = req.body;

  Books.find({ projectId: project.id })
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Book not found'));
      }

      return res.send(data);
    })
    .catch(next);
};

const updateBook = (req: any, res: Response, next: NextFunction) => {
  const { id, ...newData } = req.body;
  const options = { new: true };

  Books.findByIdAndUpdate(id, newData, options)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Book not found'));
      }

      return res.send(data);
    })
    .catch((err) => next(err));
};

const deleteBook = (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Books.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Book not found'));
      }

      return res.send({ message: `Book with id '${id}' has been deleted.` });
    })
    .catch((err) => next(err));
};

export {
  addBook, getBooks, updateBook, deleteBook,
};
