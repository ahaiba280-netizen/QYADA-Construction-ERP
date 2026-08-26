import { Router } from 'express';
import { getHRDashboard, getEmployees, getAttendance, getPayroll } from '../controllers/hrController';

const router = Router();

router.get('/dashboard', getHRDashboard);
router.get('/employees', getEmployees);
router.get('/attendance', getAttendance);
router.get('/payroll', getPayroll);

export default router;
