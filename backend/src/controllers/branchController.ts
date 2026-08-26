import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { query } from '../database/connection';
import logger from '../utils/logger';

export const getBranches = async (req: AuthRequest, res: Response) => {
  try {
    const { companyId } = req.query;
    const result = await query(
      'SELECT * FROM branches WHERE company_id = $1 AND active = true',
      [companyId || req.companyId]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error('Get branches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBranchById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM branches WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get branch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { company_id, name, name_ar, branch_code, branch_type, country, city, address, phone, email, manager_id } = req.body;

    const result = await query(
      `INSERT INTO branches (company_id, name, name_ar, branch_code, branch_type, country, city, address, phone, email, manager_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [company_id, name, name_ar, branch_code, branch_type, country, city, address, phone, email, manager_id]
    );

    logger.info(`Branch created: ${name}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create branch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, name_ar, phone, email, address, manager_id } = req.body;

    const result = await query(
      `UPDATE branches SET name = $1, name_ar = $2, phone = $3, email = $4, address = $5, manager_id = $6, updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [name, name_ar, phone, email, address, manager_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    logger.info(`Branch updated: ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update branch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteBranch = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM branches WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Branch not found' });
    }

    logger.info(`Branch deleted: ${id}`);
    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    logger.error('Delete branch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
