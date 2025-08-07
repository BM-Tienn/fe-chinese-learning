// Statistics structures for the application

// Base statistics interface
export interface I_BaseStatistics {
  totalReviews: number;
  averageScore: number;
  lastReviewed?: string;
}

// Learning statistics interface
export interface I_LearningStatistics extends I_BaseStatistics {
  masteryLevel: number;
  completionRate: number;
  totalAttempts: number;
  studyStreak: number;
}

// User statistics interface
export interface I_UserStatistics {
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  totalStudyTime: number;
  averageScore: number;
}

// Course statistics interface
export interface I_CourseStatistics {
  totalLessons: number;
  totalStudents: number;
  averageRating: number;
  completionRate: number;
}

// Lesson statistics interface
export interface I_LessonStatistics {
  totalStudents: number;
  averageScore: number;
  completionRate: number;
  averageTime: number;
}

// Word statistics interface
export interface I_WordStatistics extends I_BaseStatistics {
  masteryLevel: number;
  nextReview?: string;
}

// Vocabulary statistics interface
export interface I_VocabularyStatistics extends I_WordStatistics {
  // Additional vocabulary-specific statistics
}

// Flashcard statistics interface
export interface I_FlashcardStatistics {
  totalCards: number;
  masteredCards: number;
  totalReviews: number;
  averageScore: number;
  lastReviewed?: string;
}

// User goal statistics interface
export interface I_UserGoalStatistics {
  completionRate: number;
  daysRemaining?: number;
  averageProgress: number;
  lastUpdated?: string;
}

// User progress statistics interface
export interface I_UserProgressStatistics {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  studyStreak: number;
}

// Study session statistics interface
export interface I_StudySessionStatistics {
  duration: number;
  score: number;
  progress: number;
  vocabularyStudied: {
    vocabulary: string;
    mastery: number;
    attempts: number;
    correctAnswers: number;
  }[];
}

// Configuration statistics interface
export interface I_ConfigurationStatistics {
  count: number;
  usage: number;
  lastUpdated?: string;
}

// Overall application statistics interface
export interface I_AppStatistics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalLessons: number;
  totalWords: number;
  totalVocabularies: number;
  totalFlashcards: number;
  totalStudySessions: number;
  averageStudyTime: number;
  completionRate: number;
}
