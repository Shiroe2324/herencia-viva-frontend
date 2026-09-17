import type { HealthCoreControllerCheck200Details } from './healthCoreControllerCheck200Details';
import type { HealthCoreControllerCheck200Error } from './healthCoreControllerCheck200Error';
import type { HealthCoreControllerCheck200Info } from './healthCoreControllerCheck200Info';

export type HealthCoreControllerCheck200 = {
  status?: string;
  /** @nullable */
  info?: HealthCoreControllerCheck200Info;
  /** @nullable */
  error?: HealthCoreControllerCheck200Error;
  details?: HealthCoreControllerCheck200Details;
};
