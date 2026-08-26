import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import logger from '../utils/logger';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://qyada:qyada123@localhost:5432/qyada_db',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
});

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    logger.info('Database connected:', result.rows[0]);
    client.release();
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
};

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug(`Executed query in ${duration}ms`);
    return result;
  } catch (error) {
    logger.error(`Query failed: ${text}`, error);
    throw error;
  }
};

export const getClient = async (): Promise<PoolClient> => {
  return await pool.connect();
};

export default pool;
