import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { query } from '../database/connection';
import logger from '../utils/logger';

export const getCompanies = async (req: AuthRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM companies WHERE active = true');
    res.json(result.rows);
  } catch (error) {
    logger.error('Get companies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCompanyById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM companies WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Get company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { name, name_ar, registration_number, tax_number, country, city, address, phone, email, currency, vat_percentage } = req.body;

    const result = await query(
      `INSERT INTO companies (name, name_ar, registration_number, tax_number, country, city, address, phone, email, currency, vat_percentage, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [name, name_ar, registration_number, tax_number, country, city, address, phone, email, currency, vat_percentage, req.userId]
    );

    logger.info(`Company created: ${name}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Create company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, name_ar, phone, email, address } = req.body;

    const result = await query(
      `UPDATE companies SET name = $1, name_ar = $2, phone = $3, email = $4, address = $5, updated_by = $6, updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [name, name_ar, phone, email, address, req.userId, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    logger.info(`Company updated: ${id}`);
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Update company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCompany = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM companies WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }

    logger.info(`Company deleted: ${id}`);
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    logger.error('Delete company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
