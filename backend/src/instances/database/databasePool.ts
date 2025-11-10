import sql from 'mssql';

/**
 * @summary
 * Database connection pool configuration and management
 *
 * @module instances/database
 */

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME || 'cadastro_bancos',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.NODE_ENV === 'development',
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

/**
 * @summary
 * Gets or creates database connection pool
 *
 * @function getPool
 * @module instances/database
 *
 * @returns {Promise<sql.ConnectionPool>} Database connection pool
 *
 * @throws {Error} When connection fails
 */
export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
    console.log('Database connection pool created');
  }
  return pool;
}

/**
 * @summary
 * Closes database connection pool
 *
 * @function closePool
 * @module instances/database
 *
 * @returns {Promise<void>}
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database connection pool closed');
  }
}
