/**
 * Server is temporarily unavailable due to maintenance or overload.
 */
export interface ServiceUnavailable503 {
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
}
