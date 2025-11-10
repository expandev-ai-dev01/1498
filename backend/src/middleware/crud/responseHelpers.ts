/**
 * @summary
 * Helper function to create success response
 *
 * @function successResponse
 * @module middleware/crud
 *
 * @param {any} data - Response data
 * @param {object} [metadata] - Optional metadata
 *
 * @returns {object} Success response object
 */
export function successResponse(data: any, metadata?: any): object {
  return {
    success: true,
    data,
    ...(metadata && { metadata }),
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Helper function to create error response
 *
 * @function errorResponse
 * @module middleware/crud
 *
 * @param {string} message - Error message
 * @param {string} [code] - Error code
 *
 * @returns {object} Error response object
 */
export function errorResponse(message: string, code?: string): object {
  return {
    success: false,
    error: {
      code: code || 'ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Standard general error object
 *
 * @constant StatusGeneralError
 * @module middleware/crud
 */
export const StatusGeneralError = {
  statusCode: 500,
  message: 'Internal Server Error',
  code: 'INTERNAL_ERROR',
};
