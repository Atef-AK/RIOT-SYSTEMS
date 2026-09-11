import { Router } from 'express';
import {
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getTeam);
router.post('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), createTeamMember);
router.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), updateTeamMember);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteTeamMember);

export default router;
