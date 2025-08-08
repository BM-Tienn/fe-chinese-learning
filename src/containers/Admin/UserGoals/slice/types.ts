import { PaginationType } from 'utils/constants';
import { I_UserGoal } from 'types/shared/userGoal';

export interface AdminUserGoalsState {
  list: I_UserGoal[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminUserGoalsState = AdminUserGoalsState;
