import type { AskRecommendationStreamMetadataEvent } from './askRecommendationStreamMetadataEvent';
import type { MetadataSseEventEvent } from './metadataSseEventEvent';

export interface MetadataSseEvent {
  /** Event type identifier */
  event: MetadataSseEventEvent;
  /** Event ID for client reconnection */
  id?: string;
  /** Reconnection delay in milliseconds */
  retry?: number;
  /** Payload for Metadata */
  data: AskRecommendationStreamMetadataEvent;
}
