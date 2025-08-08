import { PaginationType } from 'utils/constants';
import { I_UserProgress } from 'types/shared/userProgress';

export interface AdminUserProgressState {
  list: I_UserProgress[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminUserProgressState = AdminUserProgressState;
