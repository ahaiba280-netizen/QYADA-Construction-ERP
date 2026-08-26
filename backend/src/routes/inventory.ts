import { Router } from 'express';
import { getInventoryDashboard, getWarehouses, getStock, getMaterials } from '../controllers/inventoryController';

const router = Router();

router.get('/dashboard', getInventoryDashboard);
router.get('/warehouses', getWarehouses);
router.get('/stock', getStock);
router.get('/materials', getMaterials);

export default router;
