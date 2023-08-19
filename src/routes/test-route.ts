import { Router } from 'express';

import { addTest, updateTest } from '../controllers';
import { UrlsApi } from '../utils';

const router = Router();

router.post(UrlsApi.TEST.INDEX, addTest);
router.patch(UrlsApi.TEST.INDEX, updateTest);

export default router;
