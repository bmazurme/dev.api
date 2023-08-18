/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Projects from '../models/project-model';

dotEnvConfig();

const addProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const project = req.body;
    const data = await Projects.create({ ...project, userId: req.user._id });

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const getProjects = async (req: any, res: Response, next: NextFunction) => {
  try {
    const data = await Projects.find({ userId: req.user._id });

    if (!data) {
      return next(new NotFoundError('Project not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const updateProject = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id, ...newData } = req.body;
    const options = { new: true };
    const data = await Projects.findByIdAndUpdate(id, newData, options);

    if (!data) {
      return next(new NotFoundError('Project not found'));
    }

    return res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

export { addProject, getProjects, updateProject };
