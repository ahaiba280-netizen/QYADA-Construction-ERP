import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import logger from '../utils/logger';
import { AuthRequest } from './errorHandler';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    req.companyId = decoded.companyId;
    req.userRoles = decoded.roles;

    logger.debug(`User ${decoded.userId} authenticated`);
    next();
  } catch (error) {
    logger.error('Authentication failed:', error);
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRoles || !req.userRoles.some(role => roles.includes(role))) {
      return res.status(403).json({
        error: 'Insufficient permissions'
      });
    }
    next();
  };
};
