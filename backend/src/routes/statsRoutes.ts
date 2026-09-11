import { Router } from 'express';
import { getDashboardStats, getActivityLogs } from '../controllers/statsController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/dashboard', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), getDashboardStats);
router.get('/activities', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), getActivityLogs);

export default router;
