import { Router } from 'express';

import authRoute from './auth';
import userRoute from './user';
import passRoute from './password';
import passwordAuth from './passwordAuth';

import authMiddleware from '../middlewares/auth';

const router = Router();

router.use('/', authRoute);
router.use('/', passwordAuth);
router.use('/', authMiddleware, userRoute);
router.use('/', authMiddleware, passRoute);

export default router;
