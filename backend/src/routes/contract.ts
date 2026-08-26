import { Router } from 'express';
import { getContracts, getContractById, createContract, updateContract, manageClaims } from '../controllers/contractController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getContracts);
router.get('/:id', getContractById);
router.post('/', requireRole(['ADMIN', 'PROJECT_MANAGER']), createContract);
router.put('/:id', requireRole(['ADMIN', 'PROJECT_MANAGER']), updateContract);
router.get('/:id/claims', manageClaims);

export default router;
