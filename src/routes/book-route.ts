import { Router } from 'express';

import {
  addBook, getBooks, updateBook, deleteBook,
} from '../controllers';
import { UrlsApi } from '../utils';

const router = Router();

router.post(UrlsApi.BOOK.INDEX, addBook);
router.get(UrlsApi.BOOK.INDEX, getBooks);
router.patch(UrlsApi.BOOK.INDEX, updateBook);
router.delete(UrlsApi.BOOK.DELETE, deleteBook);

export default router;
