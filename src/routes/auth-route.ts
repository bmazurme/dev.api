import { Router } from 'express';

import {
  loginController, createUserController, confirmEmailController,
} from '../controllers';
import { validateLoginData, validateRegistrData, UrlsApi } from '../utils';

const router = Router();

router.post(UrlsApi.SIGN.IN, validateLoginData, loginController);
router.post(UrlsApi.SIGN.UP, validateRegistrData, createUserController);
router.get(UrlsApi.SIGN.CONFIRM, confirmEmailController);

export default router;
