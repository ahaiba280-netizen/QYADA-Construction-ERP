import { Router } from 'express';
import { getBranches, getBranchById, createBranch, updateBranch, deleteBranch } from '../controllers/branchController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getBranches);
router.get('/:id', getBranchById);
router.post('/', requireRole(['ADMIN', 'EXECUTIVE']), createBranch);
router.put('/:id', requireRole(['ADMIN', 'EXECUTIVE']), updateBranch);
router.delete('/:id', requireRole(['ADMIN']), deleteBranch);

export default router;
