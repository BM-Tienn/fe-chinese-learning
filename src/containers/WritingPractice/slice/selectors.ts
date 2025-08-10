import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from '.';

const selectWritingPractice = (state: RootState) =>
  state.writingPractice || initialState;

export const selectWritingPracticeCurrentCharacter = createSelector(
  [selectWritingPractice],
  state => state.currentCharacter,
);

export const selectWritingPracticeUserDrawing = createSelector(
  [selectWritingPractice],
  state => state.userDrawing,
);

export const selectWritingPracticeDrawingData = createSelector(
  [selectWritingPractice],
  state => state.drawingData,
);

export const selectWritingPracticeCanvasSize = createSelector(
  [selectWritingPractice],
  state => state.canvasSize,
);

export const selectWritingPracticeLoading = createSelector(
  [selectWritingPractice],
  state => state.loading,
);

export const selectWritingPracticeError = createSelector(
  [selectWritingPractice],
  state => state.error,
);

export const selectWritingPracticeHistory = createSelector(
  [selectWritingPractice],
  state => state.practiceHistory,
);

export const selectWritingPracticeCurrentAccuracy = createSelector(
  [selectWritingPractice],
  state => state.currentAccuracy,
);
