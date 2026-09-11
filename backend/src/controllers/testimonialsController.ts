import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma';
import { sendError, sendSuccess } from '../utils/response';
import { AuthRequest } from '../middleware/authMiddleware';
import { ActivityService } from '../services/activityService';

const testimonialSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  company: z.string().min(2, 'Company is required'),
  position: z.string().min(2, 'Position is required'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  rating: z.number().int().min(1).max(5).default(5),
  avatar: z.string().optional().nullable(),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

export const getTestimonials = async (req: Request, res: Response) => {
  try {
    const { publishedOnly } = req.query;
    const where: any = {};
    if (publishedOnly !== 'false') where.isPublished = true;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { order: 'asc' },
    });
    return sendSuccess(res, testimonials);
  } catch (error) {
    return sendError(res, 'Failed to fetch testimonials', 500);
  }
};

export const createTestimonial = async (req: AuthRequest, res: Response) => {
  try {
    const data = testimonialSchema.parse(req.body);
    const testimonial = await prisma.testimonial.create({ data });

    await ActivityService.log({
      userId: req.user?.userId,
      userName: req.user?.name || 'Admin',
      action: 'CREATE_TESTIMONIAL',
      entity: 'Testimonial',
      entityId: testimonial.id,
    });

    return sendSuccess(res, testimonial, 'Testimonial created', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendError(res, 'Validation error', 400, error.errors);
    }
    return sendError(res, 'Failed to create testimonial', 500);
  }
};

export const updateTestimonial = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const data = testimonialSchema.parse(req.body);

    const updated = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return sendSuccess(res, updated, 'Testimonial updated');
  } catch (error) {
    return sendError(res, 'Failed to update testimonial', 500);
  }
};

export const deleteTestimonial = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.testimonial.delete({ where: { id } });
    return sendSuccess(res, null, 'Testimonial deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete testimonial', 500);
  }
};
