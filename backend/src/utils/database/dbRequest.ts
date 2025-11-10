import { getPool } from '@/instances/database';
import sql from 'mssql';

/**
 * @enum ExpectedReturn
 * @description Expected return type from database operation
 */
export enum ExpectedReturn {
  Single = 'Single',
  Multi = 'Multi',
  None = 'None',
}

/**
 * @interface IRecordSet
 * @description Generic record set interface
 */
export interface IRecordSet<T = any> {
  [key: string]: any;
}

/**
 * @summary
 * Executes a stored procedure and returns the result
 *
 * @function dbRequest
 * @module utils/database
 *
 * @param {string} routine - Stored procedure name
 * @param {object} parameters - Procedure parameters
 * @param {ExpectedReturn} expectedReturn - Expected return type
 * @param {any} [transaction] - Optional transaction object
 * @param {string[]} [resultSetNames] - Optional result set names
 *
 * @returns {Promise<any>} Database operation result
 *
 * @throws {Error} When database operation fails
 */
export async function dbRequest(
  routine: string,
  parameters: { [key: string]: any },
  expectedReturn: ExpectedReturn,
  transaction?: any,
  resultSetNames?: string[]
): Promise<any> {
  try {
    const pool = await getPool();
    const request = transaction ? new sql.Request(transaction) : pool.request();

    // Add parameters to request
    Object.keys(parameters).forEach((key) => {
      request.input(key, parameters[key]);
    });

    // Execute stored procedure
    const result = await request.execute(routine);

    // Process result based on expected return type
    switch (expectedReturn) {
      case ExpectedReturn.Single:
        return result.recordset[0] || null;

      case ExpectedReturn.Multi:
        if (resultSetNames && resultSetNames.length > 0) {
          // Return named result sets
          const namedResults: { [key: string]: IRecordSet } = {};
          resultSetNames.forEach((name, index) => {
            namedResults[name] = result.recordsets[index] || [];
          });
          return namedResults;
        }
        // Return array of result sets
        return result.recordsets;

      case ExpectedReturn.None:
        return null;

      default:
        return result.recordset;
    }
  } catch (error: any) {
    console.error('Database request error:', {
      routine,
      parameters,
      error: error.message,
    });
    throw error;
  }
}
