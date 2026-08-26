import pool, { query } from './connection';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger';

const runMigrations = async () => {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    await query(schema);
    logger.info('Database schema created successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
};

runMigrations().catch(console.error);
