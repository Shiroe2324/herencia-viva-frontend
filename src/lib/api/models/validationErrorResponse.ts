import type { ValidationErrorDetail } from './validationErrorDetail';

/**
 * Response containing one or more field validation errors with details for each.
 */
export interface ValidationErrorResponse {
  /** HTTP status code indicating the type of error. */
  status_code: number;
  /** Human-readable error type or category name. */
  error: string;
  /** Machine-readable application-specific error code for error handling. */
  code: string;
  /** Detailed, user-friendly error description explaining what went wrong. */
  message: string;
  /** ISO 8601 timestamp indicating when the error occurred. */
  timestamp: string;
  /** API endpoint path that generated the error. */
  path: string;
  /** Array of validation error details for each field that failed. */
  errors: ValidationErrorDetail[];
}
