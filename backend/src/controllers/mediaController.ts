import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { config } from '../config';
import { ActivityService } from '../services/activityService';

// POST /api/media/upload
export const uploadMedia = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return sendError(res, 'No file uploaded', 400);
    }

    const file = req.file;
    const fileUrl = `/uploads/${file.filename}`;

    const mediaRecord = await prisma.media.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url: fileUrl,
        altText: path.parse(file.originalname).name,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPLOAD_MEDIA',
      entity: 'Media',
      entityId: mediaRecord.id,
      details: { filename: file.filename },
    });

    return sendSuccess(res, mediaRecord, 'File uploaded successfully', 201);
  } catch (error) {
    return sendError(res, 'Failed to upload media file', 500);
  }
};

// GET /api/media
export const getMediaList = async (req: Request, res: Response) => {
  try {
    const { search, page = '1', limit = '50' } = req.query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      const q = String(search);
      where.OR = [
        { originalName: { contains: q, mode: 'insensitive' } },
        { filename: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, mediaItems] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
    ]);

    return sendSuccess(res, mediaItems, undefined, 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch media list', 500);
  }
};

// DELETE /api/media/:id
export const deleteMedia = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return sendError(res, 'Media not found', 404);
    }

    const filePath = path.resolve(process.cwd(), config.uploadDir, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn('Could not delete physical file:', err);
      }
    }

    await prisma.media.delete({ where: { id } });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'DELETE_MEDIA',
      entity: 'Media',
      entityId: id,
      details: { filename: media.filename },
    });

    return sendSuccess(res, null, 'Media deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete media', 500);
  }
};
