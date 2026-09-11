import { Router } from 'express';
import {
  getNavItems,
  createNavItem,
  updateNavItem,
  deleteNavItem,
} from '../controllers/navigationController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getNavItems);
router.post('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), createNavItem);
router.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), updateNavItem);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteNavItem);

export default router;
