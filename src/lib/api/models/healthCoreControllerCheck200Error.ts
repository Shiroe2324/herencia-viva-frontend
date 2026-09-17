/**
 * @nullable
 */
export type HealthCoreControllerCheck200Error = {
  [key: string]: {
    status: string;
    [key: string]: unknown;
  };
} | null;
