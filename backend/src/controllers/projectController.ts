import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { query } from '../database/connection';
import logger from '../utils/logger';

export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM projects WHERE company_id = $1 ORDER BY created_at DESC',
      [req.companyId]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error('Get projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM projects WHERE id = $1 AND company_id = $2',
      [id, req.companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Get project phases
    const phasesResult = await query(
      'SELECT * FROM project_phases WHERE project_id = $1 ORDER BY phase_order',
      [id]
    );

    const project = result.rows[0];
    project.phases = phasesResult.rows;

    res.json(project);
  } catch (error) {
    logger.error('Get project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { branch_id, project_name, project_name_ar, project_code, project_type, client_id, location, start_date, end_date, contract_value } = req.body;

    const result = await query(
      `INSERT INTO projects (company_id, branch_id, project_name, project_name_ar, project_code, project_type, client_id, location, start_date, end_date, contract_value, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
       RETURNING *`,
      [req.companyId, branch_id, project_name, project_name_ar, project_code, project_type, client_id, location, start_date, end_date, contract_value]
    );

    logger.info(`Project created: ${project_name}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { project_name, project_name_ar, project_status, progress_percentage, end_date } = req.body;

    const result = await query(
      `UPDATE projects SET project_name = $1, project_name_ar = $2, project_status = $3, progress_percentage = $4, end_date = $5, updated_at = NOW()
       WHERE id = $6 AND company_id = $7 RETURNING *`,
      [project_name, project_name_ar, project_status, progress_percentage, end_date, id, req.companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    logger.info(`Project updated: ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM projects WHERE id = $1 AND company_id = $2 RETURNING *', [id, req.companyId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    logger.info(`Project deleted: ${id}`);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    logger.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProjectDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const projectResult = await query(
      'SELECT * FROM projects WHERE id = $1 AND company_id = $2',
      [id, req.companyId]
    );

    if (projectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = projectResult.rows[0];

    const phasesResult = await query('SELECT * FROM project_phases WHERE project_id = $1', [id]);
    const activitiesResult = await query('SELECT * FROM activities WHERE project_id = $1', [id]);

    res.json({
      project,
      phases: phasesResult.rows,
      activities: activitiesResult.rows,
      stats: {
        total_cost: project.contract_value,
        progress: project.progress_percentage,
        phases_count: phasesResult.rows.length,
        activities_count: activitiesResult.rows.length
      }
    });
  } catch (error) {
    logger.error('Get project dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
