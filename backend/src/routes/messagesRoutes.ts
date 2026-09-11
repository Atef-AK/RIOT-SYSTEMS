import { Router } from 'express';
import {
  submitContactMessage,
  getMessages,
  getMessage,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/messagesController';
import { authenticate, requireRole } from '../middleware/authMiddleware';
import { contactLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/', contactLimiter, submitContactMessage);

router.get('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), getMessages);
router.get('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), getMessage);
router.patch('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), updateMessageStatus);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteMessage);

export default router;
