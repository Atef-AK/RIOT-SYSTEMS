import { Router } from 'express';
import {
  getPages,
  getPageBySlug,
  updatePage,
  getSections,
  createSection,
  updateSection,
  deleteSection,
} from '../controllers/pagesController';
import { authenticate, requireRole } from '../middleware/authMiddleware';

export const pagesRouter = Router();
pagesRouter.get('/', getPages);
pagesRouter.get('/:slug', getPageBySlug);
pagesRouter.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), updatePage);

export const sectionsRouter = Router();
sectionsRouter.get('/', getSections);
sectionsRouter.post('/', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), createSection);
sectionsRouter.put('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN', 'EDITOR']), updateSection);
sectionsRouter.delete('/:id', authenticate, requireRole(['SUPER_ADMIN', 'ADMIN']), deleteSection);
