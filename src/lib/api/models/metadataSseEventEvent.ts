/**
 * Event type identifier
 */
export type MetadataSseEventEvent = (typeof MetadataSseEventEvent)[keyof typeof MetadataSseEventEvent];

export const MetadataSseEventEvent = {
  Metadata: 'Metadata',
} as const;
