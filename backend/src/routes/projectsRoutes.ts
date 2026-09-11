import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectsController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProjects);
router.get('/:idOrSlug', getProject);

router.post('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), createProject);
router.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), updateProject);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteProject);

export default router;
