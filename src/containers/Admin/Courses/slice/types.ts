import { PaginationType } from 'utils/constants';
import { I_Course } from 'types/shared/course';

export interface AdminCoursesState {
  list: I_Course[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminCoursesState = AdminCoursesState;
