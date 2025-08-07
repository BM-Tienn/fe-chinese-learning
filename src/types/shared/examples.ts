// Example interfaces for Chinese language learning

// Base Chinese example interface
export interface I_ChineseExample {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  audio?: string;
}

// Word-specific example interface
export interface I_WordExampleData extends I_ChineseExample {
  // Additional word-specific fields if needed
  difficulty?: string;
  frequency?: number;
}

// Vocabulary-specific example interface
export interface I_VocabularyExampleData extends I_ChineseExample {
  // Additional vocabulary-specific fields if needed
  formality?: string;
  usage?: string;
}

// Grammar example interface
export interface I_GrammarExample extends I_ChineseExample {
  pattern: string;
  explanation: string;
  difficulty: string;
}

// Exercise example interface
export interface I_ExerciseExample extends I_ChineseExample {
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points?: number;
}

// Flashcard example interface
export interface I_FlashcardExample {
  front: {
    text: string;
    image?: string;
    audio?: string;
  };
  back: {
    text: string;
    pinyin?: string;
    meaning?: string;
    examples?: string[];
    image?: string;
    audio?: string;
  };
  difficulty?: string;
  tags?: string[];
  metadata?: {
    hskLevel?: number;
    frequency?: number;
    partOfSpeech?: string;
  };
}
