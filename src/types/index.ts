import { AdminCoursesState } from 'containers/Admin/Courses/slice/types';
import { AdminVocabulariesState } from 'containers/Admin/Vocabularies/slice/types';
import { AdminUsersState } from 'containers/Admin/Users/slice/types';
import { AdminLessonsState } from 'containers/Admin/Lessons/slice/types';
import { AdminFlashcardsState } from 'containers/Admin/Flashcards/slice/types';
import { AdminWordsState } from 'containers/Admin/Words/slice/types';
import { AdminConfigurationsState } from 'containers/Admin/Configurations/slice/types';
import { AdminStudySessionsState } from 'containers/Admin/StudySessions/slice/types';
import { AdminUserProgressState } from 'containers/Admin/UserProgress/slice/types';
import { AdminUserGoalsState } from 'containers/Admin/UserGoals/slice/types';

export interface RootState {
  // Add your state slices here
  // Example:
  // auth: AuthState;
  // user: UserState;
  // courses: CoursesState;
  notifications: any; // Reapop notifications state
  adminCourses: AdminCoursesState;
  adminVocabularies: AdminVocabulariesState;
  adminUsers: AdminUsersState;
  adminLessons: AdminLessonsState;
  adminFlashcards: AdminFlashcardsState;
  adminWords: AdminWordsState;
  adminConfigurations: AdminConfigurationsState;
  adminStudySessions: AdminStudySessionsState;
  adminUserProgress: AdminUserProgressState;
  adminUserGoals: AdminUserGoalsState;
}
