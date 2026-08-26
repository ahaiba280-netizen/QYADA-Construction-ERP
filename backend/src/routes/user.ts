import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/', requireRole(['ADMIN', 'EXECUTIVE']), getUsers);
router.get('/:id', getUserById);
router.post('/', requireRole(['ADMIN', 'HR_MANAGER']), createUser);
router.put('/:id', requireRole(['ADMIN', 'HR_MANAGER']), updateUser);
router.delete('/:id', requireRole(['ADMIN']), deleteUser);

export default router;
