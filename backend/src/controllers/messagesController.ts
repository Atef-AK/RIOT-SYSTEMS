import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { EmailService } from '../services/emailService';
import { ActivityService } from '../services/activityService';

const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional().nullable(),
  email: z.string().email('Valid email address is required'),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  projectType: z.string().min(1, 'Project type is required'),
  budgetRange: z.string().optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  attachmentUrl: z.string().optional().nullable(),
  honeypot: z.string().optional(), // Spam honeypot (should be empty)
});

const updateStatusSchema = z.object({
  status: z.enum(['NEW', 'READ', 'IN_PROGRESS', 'REPLIED', 'ARCHIVED']),
  internalNotes: z.string().optional().nullable(),
});

// POST /api/messages (Public contact submission)
export const submitContactMessage = async (req: Request, res: Response) => {
  try {
    const data = contactMessageSchema.parse(req.body);

    // If honeypot is filled, silent reject to fool spambots
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return sendSuccess(res, null, 'Message sent successfully');
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        country: data.country,
        projectType: data.projectType,
        budgetRange: data.budgetRange,
        message: data.message,
        attachmentUrl: data.attachmentUrl,
        ipAddress: req.ip,
      },
    });

    // Attempt non-blocking email notification
    EmailService.sendContactNotification({
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      projectType: data.projectType,
      budgetRange: data.budgetRange,
      message: data.message,
    }).catch((err) => console.error('[Email Notification Non-blocking Error]:', err));

    return sendSuccess(
      res,
      { id: newMessage.id },
      'Thank you. Your project request has been received. Our engineering team will review it and get back to you shortly.',
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation failed. Please review your inputs.', 400, error.errors);
    }
    return sendError(res, 'Failed to submit inquiry. Please try again or reach out by email.', 500);
  }
};

// GET /api/messages (Admin)
export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search, page = '1', limit = '30' } = req.query;

    const pageNum = parseInt(String(page), 10) || 1;
    const limitNum = parseInt(String(limit), 10) || 30;
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (search) {
      const q = String(search);
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
        { message: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [total, unreadCount, messages] = await Promise.all([
      prisma.contactMessage.count({ where }),
      prisma.contactMessage.count({ where: { status: 'NEW' } }),
      prisma.contactMessage.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum,
      }),
    ]);

    return sendSuccess(res, { messages, unreadCount }, undefined, 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    return sendError(res, 'Failed to retrieve messages', 500);
  }
};

// GET /api/messages/:id (Admin)
export const getMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      return sendError(res, 'Message not found', 404);
    }

    // Auto-mark as READ if it was NEW
    if (message.status === 'NEW') {
      await prisma.contactMessage.update({
        where: { id },
        data: { status: 'READ' },
      });
    }

    return sendSuccess(res, message);
  } catch (error) {
    return sendError(res, 'Failed to fetch message details', 500);
  }
};

// PATCH /api/messages/:id (Admin)
export const updateMessageStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = updateStatusSchema.parse(req.body);

    const message = await prisma.contactMessage.update({
      where: { id },
      data: {
        status: data.status,
        internalNotes: data.internalNotes !== undefined ? data.internalNotes : undefined,
      },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'UPDATE_MESSAGE_STATUS',
      entity: 'ContactMessage',
      entityId: id,
      details: { status: data.status },
    });

    return sendSuccess(res, message, 'Message updated successfully');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to update message', 500);
  }
};

// DELETE /api/messages/:id (Admin)
export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'DELETE_MESSAGE',
      entity: 'ContactMessage',
      entityId: id,
    });

    return sendSuccess(res, null, 'Message deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete message', 500);
  }
};
