/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { mongoose } from 'mongoose';

// import NotFoundError from '../errors/not-found-error';

import Test from '../models/test-model';

dotEnvConfig();

const addTest = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, projectId } = req.body;
    const data = await Test.create({ name, projectId });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateTest = async (req: any, res: Response, next: NextFunction) => {
  try {
    // _id
    // name
    // projectId

    const bulk = Test.collection.initializeOrderedBulkOp();

    // let count = 0;

    Test.collection.find({ projectId: new mongoose.Types.ObjectId('64dbc7d2d3346ad7fb2b2abb') }).forEach((document: any) => {
      // document.
      console.log(document);
      // document.arr.filter((arr: any) => arr.t < 12).forEach((element: any) => {
      //   bulk.find({ _id: document._id, 'arr.t': { $lt: 12 } }).updateOne({
      //     $pull: { arr: element },
      //   });
      //   // count++;
      // });

      // document.arr.filter((arr) => arr.n === 90).forEach((element) => {
      //   bulk.find({ _id: document._id, 'arr.n': 90 }).updateOne({
      //     $set: { 'arr.$.b': 777 },
      //   });
      //   count++;
      // });

      // bulk.find({ _id: document._id }).updateOne({ $set: { a: 555 } });
      // count++;

      // if (count % 1000 === 0) {
      //   // Выпольнить после 1000 операции
      //   bulk.execute();
      //   bulk = Test.collection.initializeOrderedBulkOp();
      // }
    });

    // Очистить очереди
    // if (count > 0) { bulk.execute(); }

    // const { id, ...newData } = req.body;
    // const options = { new: true };
    // const data = await Test.findByIdAndUpdate(id, newData, options);

    // if (!data) {
    //   return next(new NotFoundError('Book not found'));
    // }

    return res.status(200).send({});
  } catch (err) {
    return next(err);
  }
};

export { addTest, updateTest };
