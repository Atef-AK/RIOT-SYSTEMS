import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), updateSettings);

export default router;
