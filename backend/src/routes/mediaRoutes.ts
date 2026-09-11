import { Router } from 'express';
import { uploadMedia, getMediaList, deleteMedia } from '../controllers/mediaController';
import { authenticate, requireRole } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.get('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), getMediaList);
router.post(
  '/upload',
  authenticate,
  requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']),
  upload.single('file'),
  uploadMedia
);
router.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteMedia);

export default router;
