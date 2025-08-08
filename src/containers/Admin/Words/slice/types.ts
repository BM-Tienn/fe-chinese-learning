import { PaginationType } from 'utils/constants';
import { I_Word } from 'types/shared/word';

export interface AdminWordsState {
  list: I_Word[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminWordsState = AdminWordsState;
