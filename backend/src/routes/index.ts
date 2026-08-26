import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/auth';
import authRoutes from './auth';
import companyRoutes from './company';
import branchRoutes from './branch';
import userRoutes from './user';
import projectRoutes from './project';
import financeRoutes from './finance';
import procurementRoutes from './procurement';
import inventoryRoutes from './inventory';
import hrRoutes from './hr';
import assetsRoutes from './assets';
import contractRoutes from './contract';
import documentRoutes from './document';
import analyticsRoutes from './analytics';
import dashboardRoutes from './dashboard';

export const setupRoutes = () => {
  const router = Router();

  // Public Routes
  router.use('/auth', authRoutes);

  // Protected Routes
  router.use('/companies', authMiddleware, companyRoutes);
  router.use('/branches', authMiddleware, branchRoutes);
  router.use('/users', authMiddleware, userRoutes);
  router.use('/projects', authMiddleware, projectRoutes);
  router.use('/finance', authMiddleware, financeRoutes);
  router.use('/procurement', authMiddleware, procurementRoutes);
  router.use('/inventory', authMiddleware, inventoryRoutes);
  router.use('/hr', authMiddleware, hrRoutes);
  router.use('/assets', authMiddleware, assetsRoutes);
  router.use('/contracts', authMiddleware, contractRoutes);
  router.use('/documents', authMiddleware, documentRoutes);
  router.use('/analytics', authMiddleware, analyticsRoutes);
  router.use('/dashboard', authMiddleware, dashboardRoutes);

  return router;
};
