import { PaginationType } from 'utils/constants';
import { I_Lesson } from 'types/shared/lesson';

export interface AdminLessonsState {
  list: I_Lesson[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminLessonsState = AdminLessonsState;
