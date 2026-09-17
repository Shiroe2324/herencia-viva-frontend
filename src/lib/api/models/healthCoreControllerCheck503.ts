import type { HealthCoreControllerCheck503Details } from './healthCoreControllerCheck503Details';
import type { HealthCoreControllerCheck503Error } from './healthCoreControllerCheck503Error';
import type { HealthCoreControllerCheck503Info } from './healthCoreControllerCheck503Info';

export type HealthCoreControllerCheck503 = {
  status?: string;
  /** @nullable */
  info?: HealthCoreControllerCheck503Info;
  /** @nullable */
  error?: HealthCoreControllerCheck503Error;
  details?: HealthCoreControllerCheck503Details;
};
