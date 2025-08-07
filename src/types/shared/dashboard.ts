export interface I_DashboardProps {
  isDarkMode?: boolean;
}

export interface I_DashboardData {
  stats: {
    totalCourses: number;
    totalLessons: number;
    totalWords: number;
    totalFlashcards: number;
    completedLessons: number;
    studyStreak: number;
    totalStudyTime: number;
  };
  recentActivities: Array<{
    _id: string;
    type: 'lesson' | 'flashcard' | 'word' | 'course';
    title: string;
    description: string;
    timestamp: string;
    progress?: number;
  }>;
}

// Goal interface - can be reused from userGoal but simplified for dashboard
export interface I_Goal {
  label: string;
  current: number;
  total: number;
  icon: any;
  color: string;
  unit: string;
}

// Current lesson interface - can be reused from lesson but simplified for dashboard
export interface I_CurrentLesson {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  progress: number;
  image: string;
  timeSpent: string;
  isCurrent: boolean;
  score: number;
}
