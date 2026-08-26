import { Router } from 'express';
import { getExecutiveDashboard, getProjectManagerDashboard, getSiteEngineerDashboard } from '../controllers/dashboardController';

const router = Router();

router.get('/executive', getExecutiveDashboard);
router.get('/project-manager', getProjectManagerDashboard);
router.get('/site-engineer', getSiteEngineerDashboard);

export default router;
