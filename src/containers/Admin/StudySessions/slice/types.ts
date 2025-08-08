import { PaginationType } from 'utils/constants';
import { I_StudySession } from 'types/shared/studySession';

export interface AdminStudySessionsState {
  list: I_StudySession[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminStudySessionsState = AdminStudySessionsState;
