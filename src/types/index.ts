import { AdminCoursesState } from 'containers/Admin/Courses/slice/types';

export interface RootState {
  // Add your state slices here
  // Example:
  // auth: AuthState;
  // user: UserState;
  // courses: CoursesState;
  notifications: any; // Reapop notifications state
  adminCourses: AdminCoursesState;
}
