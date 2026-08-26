import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

export interface JWTPayload {
  userId: string;
  companyId: string;
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '24h'
    });
  } catch (error) {
    logger.error('Token generation failed:', error);
    throw error;
  }
};

export const generateRefreshToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret', {
      expiresIn: '7d'
    });
  } catch (error) {
    logger.error('Refresh token generation failed:', error);
    throw error;
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret') as JWTPayload;
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw error;
  }
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret') as JWTPayload;
  } catch (error) {
    logger.error('Refresh token verification failed:', error);
    throw error;
  }
};
