import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { ActivityService } from '../services/activityService';

const pageSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(2, 'Title is required'),
  metaTitle: z.string().optional().nullable(),
  metaDesc: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
});

const sectionSchema = z.object({
  pageId: z.string().min(1, 'Page ID is required'),
  sectionType: z.string().min(1, 'Section type is required'),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  content: z.union([z.string(), z.record(z.any())]).optional().nullable().transform((val) => {
    if (!val) return null;
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  order: z.number().int().default(0),
  isEnabled: z.boolean().default(true),
});

// GET /api/pages (List all pages)
export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await prisma.page.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    return sendSuccess(res, pages);
  } catch (error) {
    return sendError(res, 'Failed to fetch pages', 500);
  }
};

// GET /api/pages/:slug (Get single page with sections)
export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const page = await prisma.page.findUnique({
      where: { slug },
      include: {
        sections: {
          where: { isEnabled: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page) {
      return sendError(res, 'Page not found', 404);
    }

    return sendSuccess(res, page);
  } catch (error) {
    return sendError(res, 'Failed to fetch page', 500);
  }
};

// PUT /api/pages/:id (Update page metadata)
export const updatePage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = pageSchema.parse(req.body);

    const updated = await prisma.page.update({
      where: { id },
      data,
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_PAGE',
      entity: 'Page',
      entityId: id,
      details: { title: updated.title },
    });

    return sendSuccess(res, updated, 'Page updated successfully');
  } catch (error) {
    return sendError(res, 'Failed to update page', 500);
  }
};

// GET /api/sections (Get sections by pageId or all)
export const getSections = async (req: Request, res: Response) => {
  try {
    const { pageId } = req.query;
    const where: any = {};
    if (pageId) where.pageId = String(pageId);

    const sections = await prisma.section.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, sections);
  } catch (error) {
    return sendError(res, 'Failed to fetch sections', 500);
  }
};

// POST /api/sections (Create section)
export const createSection = async (req: AuthRequest, res: Response) => {
  try {
    const data = sectionSchema.parse(req.body);

    const section = await prisma.section.create({
      data,
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'CREATE_SECTION',
      entity: 'Section',
      entityId: section.id,
      details: { type: section.sectionType },
    });

    return sendSuccess(res, section, 'Section created successfully', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to create section', 500);
  }
};

// PUT /api/sections/:id (Update section)
export const updateSection = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = sectionSchema.partial().parse(req.body);

    const updated = await prisma.section.update({
      where: { id },
      data,
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_SECTION',
      entity: 'Section',
      entityId: id,
      details: { type: updated.sectionType },
    });

    return sendSuccess(res, updated, 'Section updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to update section', 500);
  }
};

// DELETE /api/sections/:id (Delete section)
export const deleteSection = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.section.delete({ where: { id } });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'DELETE_SECTION',
      entity: 'Section',
      entityId: id,
    });

    return sendSuccess(res, null, 'Section deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete section', 500);
  }
};
