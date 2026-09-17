/**
 * Confirmation and background job details
 */
export interface PictureDeletionResponse {
  /**
   * Background processing job identifier from queue system for tracking
   * @nullable
   */
  job_id: string | null;
}
