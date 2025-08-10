import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FLASHCARDS_GET_SETS,
  FLASHCARDS_GET_TOPICS,
  FLASHCARDS_GET_WORD_TYPES,
} from '../slice';
import { flashcardsApi, configurationsApi } from 'services';

function* handleApiCall(
  action: { payload: { params: any } },
  routine: { success: (arg0: any) => any; failure: (arg0: any) => any },
  apiMethod: any,
) {
  const { params } = action.payload;
  try {
    console.log('Saga: Calling API with params:', params);

    const response = yield call(apiMethod, params);
    console.log('Saga: API response:', response);

    yield put(routine.success(response));
  } catch (err: any) {
    console.error('Saga: API call failed:', err);
    console.error('Saga: Error details:', {
      message: err?.message,
      stack: err?.stack,
      response: err?.response?.data,
    });
    yield put(
      routine.failure({
        message: err?.message || 'Có lỗi xảy ra',
        response: err?.response?.data,
      }),
    );
  }
}

function* getFlashcardSets(action: any) {
  console.log('Saga: getFlashcardSets called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARDS_GET_SETS,
    flashcardsApi.getUserFlashcardSets.bind(flashcardsApi),
  );
}

function* getTopics(action: any) {
  console.log('Saga: getTopics called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARDS_GET_TOPICS,
    configurationsApi.getConfigurationsByType.bind(configurationsApi, 'topic'),
  );
}

function* getWordTypes(action: any) {
  console.log('Saga: getWordTypes called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARDS_GET_WORD_TYPES,
    configurationsApi.getConfigurationsByType.bind(
      configurationsApi,
      'wordType',
    ),
  );
}

export function* flashcardsSaga() {
  yield takeLatest(FLASHCARDS_GET_SETS.TRIGGER, getFlashcardSets);
  yield takeLatest(FLASHCARDS_GET_TOPICS.TRIGGER, getTopics);
  yield takeLatest(FLASHCARDS_GET_WORD_TYPES.TRIGGER, getWordTypes);
}
