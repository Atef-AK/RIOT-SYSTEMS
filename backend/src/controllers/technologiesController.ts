import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';

const techSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['HARDWARE', 'COMMUNICATION', 'SOFTWARE', 'AI', 'CLOUD']),
  icon: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const getTechnologies = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category && category !== 'ALL') where.category = String(category);

    const items = await prisma.technology.findMany({
      where,
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
    return sendSuccess(res, items);
  } catch (error) {
    return sendError(res, 'Failed to fetch technologies', 500);
  }
};

export const createTechnology = async (req: AuthRequest, res: Response) => {
  try {
    const data = techSchema.parse(req.body);
    const item = await prisma.technology.create({ data });
    return sendSuccess(res, item, 'Technology added', 201);
  } catch (error) {
    return sendError(res, 'Failed to add technology', 500);
  }
};

export const updateTechnology = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = techSchema.parse(req.body);
    const updated = await prisma.technology.update({ where: { id }, data });
    return sendSuccess(res, updated, 'Technology updated');
  } catch (error) {
    return sendError(res, 'Failed to update technology', 500);
  }
};

export const deleteTechnology = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.technology.delete({ where: { id } });
    return sendSuccess(res, null, 'Technology deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete technology', 500);
  }
};
