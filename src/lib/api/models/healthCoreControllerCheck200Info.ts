/**
 * @nullable
 */
export type HealthCoreControllerCheck200Info = {
  [key: string]: {
    status: string;
    [key: string]: unknown;
  };
} | null;
