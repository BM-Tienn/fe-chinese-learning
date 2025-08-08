import { PaginationType } from 'utils/constants';
import { I_Configuration } from 'types/shared/configuration';

export interface AdminConfigurationsState {
  list: I_Configuration[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminConfigurationsState = AdminConfigurationsState;
