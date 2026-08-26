import { Router } from 'express';
import { getFinancialDashboard, getInvoices, getPayments, getCostControl } from '../controllers/financeController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/dashboard', getFinancialDashboard);
router.get('/invoices', getInvoices);
router.get('/payments', getPayments);
router.get('/cost-control', getCostControl);

export default router;
