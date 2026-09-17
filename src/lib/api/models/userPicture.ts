import type { UserPictureOrigin } from './userPictureOrigin';

/**
 * Represents a user profile picture or avatar image
 */
export interface UserPicture {
  /** Unique picture identifier (UUID format) */
  id: string;
  /**
   * Publicly accessible URL of the user profile image
   * @nullable
   */
  url: string | null;
  /**
   * Reference ID for image processing job used for asynchronous tracking
   * @nullable
   */
  job_id: string | null;
  /** Indicates whether the picture is still being processed */
  processing: boolean;
  /** Source of the picture (oauth provider, local upload, etc.) */
  origin: UserPictureOrigin;
  /** ISO 8601 timestamp of picture upload */
  created_at: string;
  /** ISO 8601 timestamp of last picture update */
  updated_at: string;
}
