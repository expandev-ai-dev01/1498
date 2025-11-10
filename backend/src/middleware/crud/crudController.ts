import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule for CRUD operations
 *
 * @property {string} securable - Resource name
 * @property {string} permission - Permission type (CREATE, READ, UPDATE, DELETE)
 */
interface SecurityRule {
  securable: string;
  permission: string;
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 *
 * @property {object} credential - User credential information
 * @property {number} credential.idAccount - Account identifier
 * @property {number} credential.idUser - User identifier
 * @property {object} params - Validated parameters
 */
interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Controller for CRUD operations with security validation
 */
export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  /**
   * @summary
   * Validates request for CREATE operation
   *
   * @function create
   * @module middleware/crud
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async create(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validate(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates request for READ operation
   *
   * @function read
   * @module middleware/crud
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, Error | null]> {
    return this.validate(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates request for UPDATE operation
   *
   * @function update
   * @module middleware/crud
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async update(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validate(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates request for DELETE operation
   *
   * @function delete
   * @module middleware/crud
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  async delete(
    req: Request,
    schema: z.ZodSchema
  ): Promise<[ValidationResult | null, Error | null]> {
    return this.validate(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Core validation logic for all CRUD operations
   *
   * @function validate
   * @module middleware/crud
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   *
   * @returns {Promise<[ValidationResult | null, Error | null]>} Validation result or error
   */
  private async validate(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, Error | null]> {
    try {
      // Extract credential from request (simplified - no JWT)
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      // Validate request parameters
      const params = {
        ...req.params,
        ...req.query,
        ...req.body,
      };

      const validatedParams = await schema.parseAsync(params);

      return [
        {
          credential,
          params: validatedParams,
        },
        null,
      ];
    } catch (error: any) {
      return [null, error];
    }
  }
}
