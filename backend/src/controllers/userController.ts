import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { query } from '../database/connection';
import logger from '../utils/logger';

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, username, email, first_name, last_name, job_title, department_id, active FROM users WHERE company_id = $1',
      [req.companyId]
    );
    res.json(result.rows);
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT id, username, email, first_name, last_name, job_title, department_id, active FROM users WHERE id = $1 AND company_id = $2',
      [id, req.companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, first_name, last_name, department_id, job_title } = req.body;

    const result = await query(
      `INSERT INTO users (company_id, username, email, password_hash, first_name, last_name, department_id, job_title, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true)
       RETURNING id, username, email, first_name, last_name`,
      [req.companyId, username, email, 'hashed_password', first_name, last_name, department_id, job_title]
    );

    logger.info(`User created: ${email}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, job_title, department_id } = req.body;

    const result = await query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3, job_title = $4, department_id = $5, updated_at = NOW()
       WHERE id = $6 AND company_id = $7 RETURNING *`,
      [first_name, last_name, phone, job_title, department_id, id, req.companyId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User updated: ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM users WHERE id = $1 AND company_id = $2 RETURNING *', [id, req.companyId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info(`User deleted: ${id}`);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
