import { PaginationType } from 'utils/constants';
import { I_Vocabulary } from 'types/shared/vocabulary';

export interface AdminVocabulariesState {
  list: I_Vocabulary[];
  loading: boolean;
  pagination?: PaginationType;
}

export type DefaultAdminVocabulariesState = AdminVocabulariesState;
