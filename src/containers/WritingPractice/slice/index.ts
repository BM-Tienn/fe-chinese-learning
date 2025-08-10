import { createSlice } from 'utils/@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { DefaultWritingPracticeState } from './types';

export const initialState: DefaultWritingPracticeState = {
  currentCharacter: '',
  userDrawing: false,
  drawingData: {
    points: [],
    isDrawing: false,
  },
  canvasSize: {
    width: 400,
    height: 400,
  },
  loading: false,
  error: null,
  practiceHistory: [],
  currentAccuracy: 0,
};

const writingPracticeSlice = createSlice({
  name: 'writingPractice',
  initialState,
  reducers: {
    setCurrentCharacter: (state, action: PayloadAction<string>) => {
      state.currentCharacter = action.payload;
    },
    setUserDrawing: (state, action: PayloadAction<boolean>) => {
      state.userDrawing = action.payload;
    },
    startDrawing: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.drawingData.isDrawing = true;
      state.drawingData.points = [action.payload];
    },
    continueDrawing: (
      state,
      action: PayloadAction<{ x: number; y: number }>,
    ) => {
      if (state.drawingData.isDrawing) {
        state.drawingData.points.push(action.payload);
      }
    },
    stopDrawing: state => {
      state.drawingData.isDrawing = false;
    },
    clearDrawing: state => {
      state.drawingData.points = [];
      state.drawingData.isDrawing = false;
    },
    setCanvasSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>,
    ) => {
      state.canvasSize = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    addPracticeHistory: (
      state,
      action: PayloadAction<{
        character: string;
        timestamp: string;
        accuracy: number;
      }>,
    ) => {
      state.practiceHistory.push(action.payload);
    },
    setCurrentAccuracy: (state, action: PayloadAction<number>) => {
      state.currentAccuracy = action.payload;
    },
    resetState: state => {
      state.currentCharacter = '';
      state.userDrawing = false;
      state.drawingData = {
        points: [],
        isDrawing: false,
      };
      state.canvasSize = {
        width: 400,
        height: 400,
      };
      state.loading = false;
      state.error = null;
      state.currentAccuracy = 0;
    },
  },
});

export const { actions, reducer, name: sliceKey } = writingPracticeSlice;
export const useWritingPracticeSlice = () => {
  return { actions: writingPracticeSlice.actions };
};
