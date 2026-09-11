import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error('[Error Details]:', err);

  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return sendError(res, 'Validation error', 400, formattedErrors);
  }

  if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid or expired token', 401);
  }

  if (err.code === 'P2002') {
    return sendError(res, 'A record with this unique field already exists', 409);
  }

  if (err.code === 'P2025') {
    return sendError(res, 'Resource not found', 404);
  }

  return sendError(
    res,
    process.env.NODE_ENV === 'production' ? 'An unexpected internal error occurred' : err.message || 'Internal server error',
    err.statusCode || 500
  );
};
