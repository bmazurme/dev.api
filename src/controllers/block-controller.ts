/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Blocks from '../models/block-model';

dotEnvConfig();

const addBlock = (req: any, res: Response, next: NextFunction) => {
  const block = req.body;

  Blocks.create({ ...block, userId: req.user._id })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

const getBlocks = (req: any, res: Response, next: NextFunction) => {
  const book = req.body;

  Blocks.find({ projectId: book.id })
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Block not found'));
      }

      return res.send(data);
    })
    .catch(next);
};

const updateBlock = (req: any, res: Response, next: NextFunction) => {
  const { id, ...newData } = req.body;
  const options = { new: true };

  Blocks.findByIdAndUpdate(id, newData, options)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Block not found'));
      }

      return res.send(data);
    })
    .catch((err) => next(err));
};

const deleteBlock = (req: any, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Blocks.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Block not found'));
      }

      return res.send({ message: `Block with id '${id}' has been deleted.` });
    })
    .catch((err) => next(err));
};

export {
  addBlock, getBlocks, updateBlock, deleteBlock,
};
