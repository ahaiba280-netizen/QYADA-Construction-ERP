import { Router } from 'express';
import { getProjectAnalytics, getFinancialAnalytics, getOperationalAnalytics } from '../controllers/analyticsController';

const router = Router();

router.get('/projects', getProjectAnalytics);
router.get('/financial', getFinancialAnalytics);
router.get('/operational', getOperationalAnalytics);

export default router;
