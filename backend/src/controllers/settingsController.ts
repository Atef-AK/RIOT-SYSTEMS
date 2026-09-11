import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { ActivityService } from '../services/activityService';

// GET /api/settings
export const getSettings = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const where: any = {};
    if (category) where.category = String(category);

    const settings = await prisma.siteSetting.findMany({ where });
    // Convert array of settings to key-value object map
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    return sendSuccess(res, { list: settings, map: settingsMap });
  } catch (error) {
    return sendError(res, 'Failed to fetch site settings', 500);
  }
};

// PUT /api/settings (Bulk upsert key-values)
export const updateSettings = async (req: AuthRequest, res: Response) => {
  try {
    const settingsObj = req.body; // e.g. { "site_name": "R-IoTSys", "contact_email": "contact@r-iotsys.tn" }

    if (typeof settingsObj !== 'object' || settingsObj === null) {
      return sendError(res, 'Invalid settings payload', 400);
    }

    const updates = Object.entries(settingsObj).map(([key, value]) => {
      const valStr = typeof value === 'string' ? value : JSON.stringify(value);
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value: valStr },
        create: { key, value: valStr },
      });
    });

    await prisma.$transaction(updates);

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_SETTINGS',
      entity: 'SiteSetting',
      details: { keys: Object.keys(settingsObj) },
    });

    return sendSuccess(res, null, 'Settings updated successfully');
  } catch (error) {
    return sendError(res, 'Failed to update settings', 500);
  }
};
