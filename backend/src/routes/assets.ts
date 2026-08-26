import { Router } from 'express';
import { getAssetsDashboard, getEquipment, getVehicles, getMaintenance } from '../controllers/assetsController';

const router = Router();

router.get('/dashboard', getAssetsDashboard);
router.get('/equipment', getEquipment);
router.get('/vehicles', getVehicles);
router.get('/maintenance', getMaintenance);

export default router;
