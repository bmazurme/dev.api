import { Router } from 'express';

import {
  addBlock, getBlocks, updateBlock, deleteBlock,
} from '../controllers';
import { UrlsApi } from '../utils';

const router = Router();

router.post(UrlsApi.BLOCK.INDEX, addBlock);
router.get(UrlsApi.BLOCK.INDEX, getBlocks);
router.patch(UrlsApi.BLOCK.INDEX, updateBlock);
router.delete(UrlsApi.BLOCK.DELETE, deleteBlock);

export default router;
