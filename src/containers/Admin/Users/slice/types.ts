import { PaginationType } from 'utils/constants';
import { I_User } from 'types/shared/user';

export interface AdminUsersState {
  list: I_User[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminUsersState = AdminUsersState;
