import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export interface AuthRequest extends Request {
  userId?: string;
  companyId?: string;
  userRoles?: string[];
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized'
    });
  }

  return res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};
