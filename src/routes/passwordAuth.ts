import { Router } from 'express';

import { newPasswordController, resetPasswordController } from '../controllers';
import { UrlsApi } from '../utils';

const router = Router();

router.patch(UrlsApi.PASS.RESET, resetPasswordController);
router.patch(UrlsApi.PASS.NEW, newPasswordController);

export default router;
