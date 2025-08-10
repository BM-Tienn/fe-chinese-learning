export interface WritingPracticeState {
  currentCharacter: string;
  userDrawing: boolean;
  drawingData: {
    points: Array<{ x: number; y: number }>;
    isDrawing: boolean;
  };
  canvasSize: {
    width: number;
    height: number;
  };
  loading: boolean;
  error: string | null;
  practiceHistory: Array<{
    character: string;
    timestamp: string;
    accuracy: number;
  }>;
  currentAccuracy: number;
}

export type DefaultWritingPracticeState = WritingPracticeState;
