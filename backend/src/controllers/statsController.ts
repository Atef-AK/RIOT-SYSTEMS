import { Response } from 'express';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      draftProjects,
      totalServices,
      totalMessages,
      unreadMessages,
      totalMedia,
      recentMessages,
      recentActivities,
      projectsByCategoryRaw,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { published: true } }),
      prisma.project.count({ where: { published: false } }),
      prisma.service.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'NEW' } }),
      prisma.media.count(),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activityLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.groupBy({
        by: ['category'],
        _count: {
          category: true,
        },
      }),
    ]);

    const projectsByCategory = projectsByCategoryRaw.map((p) => ({
      category: p.category,
      count: p._count.category,
    }));

    return sendSuccess(res, {
      totalProjects,
      publishedProjects,
      draftProjects,
      totalServices,
      totalMessages,
      unreadMessages,
      totalMedia,
      recentMessages,
      recentActivities,
      projectsByCategory,
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch dashboard metrics', 500);
  }
};

export const getActivityLogs = async (req: AuthRequest, res: Response) => {
  try {
    const { page = '1', limit = '50' } = req.query;
    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const [total, logs] = await Promise.all([
      prisma.activityLog.count(),
      prisma.activityLog.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
    ]);

    return sendSuccess(res, logs, undefined, 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch activity logs', 500);
  }
};
