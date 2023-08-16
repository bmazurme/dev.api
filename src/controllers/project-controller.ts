/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { config as dotEnvConfig } from 'dotenv';

import NotFoundError from '../errors/not-found-error';

import Projects from '../models/project-model';

dotEnvConfig();

const addProject = (req: any, res: Response, next: NextFunction) => {
  const project = req.body;

  Projects.create({ ...project, userId: req.user._id })
    .then((data) => res.status(200).send(data))
    .catch((err) => next(err));
};

const getProjects = (req: any, res: Response, next: NextFunction) => {
  Projects.find({ userId: req.user._id })
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Project not found'));
      }

      return res.send(data);
    })
    .catch(next);
};

const updateProject = (req: any, res: Response, next: NextFunction) => {
  const { id, ...newData } = req.body;
  const options = { new: true };

  Projects.findByIdAndUpdate(id, newData, options)
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('Project not found'));
      }

      return res.send(data);
    })
    .catch((err) => next(err));
};

export { addProject, getProjects, updateProject };
