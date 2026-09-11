import { Router } from 'express';
import {
  getTechnologies,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from '../controllers/technologiesController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getTechnologies);
router.post('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), createTechnology);
router.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), updateTechnology);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteTechnology);

export default router;
