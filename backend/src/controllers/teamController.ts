import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';

const teamSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().min(2, 'Role is required'),
  bio: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  linkedin: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  skills: z.union([z.string(), z.array(z.string())]).optional().nullable().transform((val) => {
    if (!val) return '[]';
    return typeof val === 'string' ? val : JSON.stringify(val);
  }),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const getTeam = async (req: Request, res: Response) => {
  try {
    const { publishedOnly } = req.query;
    const where: any = {};
    if (publishedOnly !== 'false') where.isPublished = true;

    const team = await prisma.teamMember.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, team);
  } catch (error) {
    return sendError(res, 'Failed to fetch team members', 500);
  }
};

export const createTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const data = teamSchema.parse(req.body);
    const member = await prisma.teamMember.create({ data });
    return sendSuccess(res, member, 'Team member added', 201);
  } catch (error) {
    return sendError(res, 'Failed to create team member', 500);
  }
};

export const updateTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = teamSchema.parse(req.body);
    const updated = await prisma.teamMember.update({ where: { id }, data });
    return sendSuccess(res, updated, 'Team member updated');
  } catch (error) {
    return sendError(res, 'Failed to update team member', 500);
  }
};

export const deleteTeamMember = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.teamMember.delete({ where: { id } });
    return sendSuccess(res, null, 'Team member deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete team member', 500);
  }
};
