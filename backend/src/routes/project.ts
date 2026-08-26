import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject, getProjectDashboard } from '../controllers/projectController';
import { requireRole } from '../middleware/auth';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/:id/dashboard', getProjectDashboard);
router.post('/', requireRole(['ADMIN', 'EXECUTIVE', 'PROJECT_MANAGER']), createProject);
router.put('/:id', requireRole(['ADMIN', 'PROJECT_MANAGER']), updateProject);
router.delete('/:id', requireRole(['ADMIN']), deleteProject);

export default router;
