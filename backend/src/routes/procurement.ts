import { Router } from 'express';
import { getProcurementDashboard, getVendors, getPurchaseOrders, getRFQs } from '../controllers/procurementController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/dashboard', getProcurementDashboard);
router.get('/vendors', getVendors);
router.get('/purchase-orders', getPurchaseOrders);
router.get('/rfqs', getRFQs);

export default router;
