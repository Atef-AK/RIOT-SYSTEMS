import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { createSlug } from '../utils/slugify';
import { AuthRequest } from '../middleware/authMiddleware';
import { ActivityService } from '../services/activityService';

const serviceSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  icon: z.string().default('Cpu'),
  category: z.string().min(2, 'Category is required'),
  shortDesc: z.string().min(10, 'Short description must be at least 10 characters'),
  fullDesc: z.string().min(20, 'Full description must be at least 20 characters'),
  coverImage: z.string().optional().nullable(),
  features: z.union([z.string(), z.array(z.string())]).transform((val) => {
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  technologies: z.union([z.string(), z.array(z.string())]).transform((val) => {
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  order: z.number().int().default(0),
  isPublished: z.boolean().default(true),
});

// GET /api/services (Public: only published; Admin: all)
export const getServices = async (req: Request, res: Response) => {
  try {
    const { category, publishedOnly } = req.query;

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = String(category);
    }
    if (publishedOnly !== 'false') {
      where.isPublished = true;
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    return sendSuccess(res, services);
  } catch (error) {
    return sendError(res, 'Failed to fetch services', 500);
  }
};

// GET /api/services/:idOrSlug
export const getService = async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;

    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    return sendSuccess(res, service);
  } catch (error) {
    return sendError(res, 'Failed to fetch service', 500);
  }
};

// POST /api/services (Admin)
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const data = serviceSchema.parse(req.body);
    let baseSlug = createSlug(data.title);
    let slug = baseSlug;
    let count = 1;

    while (await prisma.service.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const service = await prisma.service.create({
      data: {
        ...data,
        slug,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'CREATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      details: { title: service.title },
    });

    return sendSuccess(res, service, 'Service created successfully', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to create service', 500);
  }
};

// PUT /api/services/:id (Admin)
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = serviceSchema.parse(req.body);

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Service not found', 404);
    }

    const updated = await prisma.service.update({
      where: { id },
      data: {
        ...data,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_SERVICE',
      entity: 'Service',
      entityId: updated.id,
      details: { title: updated.title },
    });

    return sendSuccess(res, updated, 'Service updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to update service', 500);
  }
};

// DELETE /api/services/:id (Admin)
export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Service not found', 404);
    }

    await prisma.service.delete({ where: { id } });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'DELETE_SERVICE',
      entity: 'Service',
      entityId: id,
      details: { title: existing.title },
    });

    return sendSuccess(res, null, 'Service deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete service', 500);
  }
};
