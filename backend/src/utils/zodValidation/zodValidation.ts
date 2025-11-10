import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for database fields
 *
 * @module utils/zodValidation
 */

// BIT field (0 or 1)
export const zBit = z.number().int().min(0).max(1);

// Date string validation
export const zDateString = z.string().datetime();

// Foreign key validation (positive integer)
export const zFK = z.number().int().positive();

// Name field (1-200 characters)
export const zName = z.string().min(1).max(200);

// Nullable description (max 500 characters)
export const zNullableDescription = z.string().max(500).nullable();

// Nullable foreign key
export const zNullableFK = z.number().int().positive().nullable();

// Nullable string with max length
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

// String with max length
export const zString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema;
};
