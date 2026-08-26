import { Router } from 'express';
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from '../controllers/companyController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', requireRole(['ADMIN']), createCompany);
router.put('/:id', requireRole(['ADMIN']), updateCompany);
router.delete('/:id', requireRole(['ADMIN']), deleteCompany);

export default router;
