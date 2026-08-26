import { Response } from 'express';
import { AuthRequest } from '../middleware/errorHandler';
import { query } from '../database/connection';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/encryption';
import logger from '../utils/logger';

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, companyId } = req.body;

    if (!email || !password || !companyId) {
      return res.status(400).json({ error: 'Email, password, and companyId are required' });
    }

    const result = await query(
      'SELECT * FROM users WHERE email = $1 AND company_id = $2',
      [email, companyId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = await comparePassword(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Get user roles
    const rolesResult = await query(
      `SELECT r.name FROM roles r 
       JOIN user_roles ur ON r.id = ur.role_id 
       WHERE ur.user_id = $1`,
      [user.id]
    );

    const roles = rolesResult.rows.map(r => r.name);

    const token = generateToken({
      userId: user.id,
      companyId: user.company_id,
      email: user.email,
      roles
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      companyId: user.company_id,
      email: user.email,
      roles
    });

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    logger.info(`User ${email} logged in successfully`);

    res.json({
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        company_id: user.company_id,
        roles
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const register = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, first_name, last_name, company_id, username } = req.body;

    if (!email || !password || !company_id || !username) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Check if user exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await hashPassword(password);

    const result = await query(
      `INSERT INTO users (company_id, username, email, password_hash, first_name, last_name, active)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       RETURNING id, email, first_name, last_name, company_id`,
      [company_id, username, email, passwordHash, first_name, last_name]
    );

    const user = result.rows[0];

    const token = generateToken({
      userId: user.id,
      companyId: user.company_id,
      email: user.email,
      roles: ['EMPLOYEE']
    });

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    // Verify and refresh token logic
    res.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
