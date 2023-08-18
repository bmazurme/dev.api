/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Blocks from '../models/block-model';

dotEnvConfig();

const addBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const block = req.body;
    const data = await Blocks.create({ ...block, userId: req.user._id });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getBlocks = async (req: any, res: Response, next: NextFunction) => {
  try {
    const book = req.body;
    const data = await Blocks.find({ projectId: book.id });

    if (!data) {
      return next(new NotFoundError('Block not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Blocks.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Block not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const deleteBlock = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Blocks.findByIdAndDelete(id);

    if (!data) {
      return next(new NotFoundError('Block not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

export {
  addBlock, getBlocks, updateBlock, deleteBlock,
};
