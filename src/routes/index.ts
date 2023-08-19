import { Router } from 'express';

import authRoute from './auth-route';
import userRoute from './user-route';
import passRoute from './password-route';
import passwordAuth from './password-auth-route';
import projectRoute from './project-route';
import bookRoute from './book-route';
import blockRoute from './block-route';
import testRoute from './test-route';

import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use('/', authRoute);
router.use('/', passwordAuth);
router.use('/', testRoute);
router.use('/', authMiddleware, userRoute);
router.use('/', authMiddleware, projectRoute);
router.use('/', authMiddleware, bookRoute);
router.use('/', authMiddleware, blockRoute);
router.use('/', authMiddleware, passRoute);

export default router;
