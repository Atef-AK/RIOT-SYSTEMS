import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { createSlug } from '../utils/slugify';
import { AuthRequest } from '../middleware/authMiddleware';
import { ActivityService } from '../services/activityService';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(2, 'Category is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  challenge: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  results: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
  clientIndustry: z.string().optional().nullable(),
  year: z.string().optional().nullable(),
  coverImage: z.string().min(1, 'Cover image URL is required'),
  gallery: z.union([z.string(), z.array(z.string())]).optional().nullable().transform((val) => {
    if (!val) return '[]';
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  technologies: z.union([z.string(), z.array(z.string())]).transform((val) => {
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),
});

// GET /api/projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const { category, featured, search, publishedOnly, page = '1', limit = '50' } = req.query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (publishedOnly !== 'false') {
      where.published = true;
    }

    if (category && category !== 'ALL') {
      where.category = String(category);
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      const q = String(search);
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { summary: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, projects] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limitNum,
      }),
    ]);

    return sendSuccess(res, projects, undefined, 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch projects', 500);
  }
};

// GET /api/projects/:idOrSlug
export const getProject = async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
    });

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    return sendSuccess(res, project);
  } catch (error) {
    return sendError(res, 'Failed to fetch project', 500);
  }
};

// POST /api/projects (Admin)
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const data = projectSchema.parse(req.body);
    let baseSlug = createSlug(data.title);
    let slug = baseSlug;
    let count = 1;

    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'CREATE_PROJECT',
      entity: 'Project',
      entityId: project.id,
      details: { title: project.title },
    });

    return sendSuccess(res, project, 'Project created successfully', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to create project', 500);
  }
};

// PUT /api/projects/:id (Admin)
export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = projectSchema.parse(req.body);

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Project not found', 404);
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...data,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_PROJECT',
      entity: 'Project',
      entityId: updated.id,
      details: { title: updated.title },
    });

    return sendSuccess(res, updated, 'Project updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to update project', 500);
  }
};

// DELETE /api/projects/:id (Admin)
export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 'Project not found', 404);
    }

    await prisma.project.delete({ where: { id } });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'DELETE_PROJECT',
      entity: 'Project',
      entityId: id,
      details: { title: existing.title },
    });

    return sendSuccess(res, null, 'Project deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete project', 500);
  }
};
