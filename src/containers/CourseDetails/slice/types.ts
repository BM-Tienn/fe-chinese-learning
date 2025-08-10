import { I_Course } from 'types/shared/course';
import { I_LessonSimple } from 'types/shared/lesson';

export interface CourseDetailsState {
  course: I_Course | null;
  lessons: I_LessonSimple[];
  loading: boolean;
  error: string | null;
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

export type DefaultCourseDetailsState = CourseDetailsState;
