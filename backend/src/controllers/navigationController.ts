import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';

const navSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
  order: z.number().int().default(0),
  target: z.string().default('_self'),
  isVisible: z.boolean().default(true),
});

export const getNavItems = async (req: Request, res: Response) => {
  try {
    const { visibleOnly } = req.query;
    const where: any = {};
    if (visibleOnly !== 'false') where.isVisible = true;

    const items = await prisma.navigationItem.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, items);
  } catch (error) {
    return sendError(res, 'Failed to fetch navigation items', 500);
  }
};

export const createNavItem = async (req: AuthRequest, res: Response) => {
  try {
    const data = navSchema.parse(req.body);
    const item = await prisma.navigationItem.create({ data });
    return sendSuccess(res, item, 'Nav item created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create navigation item', 500);
  }
};

export const updateNavItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = navSchema.parse(req.body);
    const updated = await prisma.navigationItem.update({ where: { id }, data });
    return sendSuccess(res, updated, 'Nav item updated');
  } catch (error) {
    return sendError(res, 'Failed to update navigation item', 500);
  }
};

export const deleteNavItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.navigationItem.delete({ where: { id } });
    return sendSuccess(res, null, 'Nav item deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete navigation item', 500);
  }
};
