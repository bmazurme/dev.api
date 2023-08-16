import { Router } from 'express';

import { updatePasswordController } from '../controllers';
import { validatePassword, UrlsApi } from '../utils';

const router = Router();

router.patch(UrlsApi.PASS.UPDATE, validatePassword, updatePasswordController);

export default router;
