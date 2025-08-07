// Metadata structures for the application

// Base metadata interface
export interface I_BaseMetadata {
  tags?: string[];
  notes?: string;
  source?: string;
  color?: string;
  icon?: string;
  description?: string;
}

// Learning metadata interface
export interface I_LearningMetadata extends I_BaseMetadata {
  level?: number;
  difficulty?: string;
  category?: string;
  prerequisites?: string[];
  learningObjectives?: string[];
}

// User metadata interface
export interface I_UserMetadata extends I_BaseMetadata {
  preferences?: {
    language?: string;
    theme?: string;
    notifications?: boolean;
  };
  profile?: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    gender?: string;
    bio?: string;
  };
}

// Course metadata interface
export interface I_CourseMetadata extends I_LearningMetadata {
  totalLessons?: number;
  students?: number;
  rating?: number;
  isNewCourse?: boolean;
  isPopular?: boolean;
  order?: number;
}

// Lesson metadata interface
export interface I_LessonMetadata extends I_LearningMetadata {
  estimatedTime?: number;
  vocabulary?: string[];
  grammar?: {
    patterns?: string[];
    explanations?: string[];
    examples?: string[];
  };
  exercises?: {
    type?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string | string[];
    explanation?: string;
  }[];
}

// Word metadata interface
export interface I_WordMetadata extends I_BaseMetadata {
  hskLevel?: number;
  frequency?: number;
  formality?: string;
  related?: {
    synonyms?: string[];
    antonyms?: string[];
    compounds?: string[];
  };
}

// Vocabulary metadata interface
export interface I_VocabularyMetadata extends I_WordMetadata {
  // Additional vocabulary-specific metadata
}

// Flashcard metadata interface
export interface I_FlashcardMetadata extends I_LearningMetadata {
  cardCount?: number;
  timeEstimate?: string;
  isNewSet?: boolean;
  isRecommended?: boolean;
}

// Configuration metadata interface
export interface I_ConfigurationMetadata extends I_BaseMetadata {
  parentKey?: string;
  level?: number;
  difficulty?: string;
  category?: string;
}

// User goal metadata interface
export interface I_UserGoalMetadata extends I_BaseMetadata {
  reminders?: boolean;
  endDate?: string;
}

// User progress metadata interface
export interface I_UserProgressMetadata extends I_BaseMetadata {
  device?: string;
  location?: string;
  difficulty?: string;
}

// Study session metadata interface
export interface I_StudySessionMetadata extends I_UserProgressMetadata {
  // Additional study session-specific metadata
}
