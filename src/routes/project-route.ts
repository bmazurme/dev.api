import { Router } from 'express';

import { addProject, getProjects, updateProject } from '../controllers';
import { UrlsApi } from '../utils';

const router = Router();

router.post(UrlsApi.PROJECT.INDEX, addProject);
router.get(UrlsApi.PROJECT.INDEX, getProjects);
router.patch(UrlsApi.PROJECT.INDEX, updateProject);

export default router;
