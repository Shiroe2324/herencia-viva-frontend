/**
 * Details of a single field that failed validation.
 */
export interface ValidationErrorDetail {
  /** Name of the field that failed validation checks. */
  field: string;
  /** Specific validation error message describing the requirement not met. */
  message: string;
}
