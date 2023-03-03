import { Router } from 'express';

import { updatePasswordController } from '../controllers';
import { validatePassword } from '../utils/validator';
import { UrlsApi } from '../utils/routers';

const router = Router();

router.patch(UrlsApi.PASS.UPDATE, validatePassword, updatePasswordController);

export default router;
