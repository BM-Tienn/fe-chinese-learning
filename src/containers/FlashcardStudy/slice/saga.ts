import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FLASHCARD_STUDY_GET_SESSION,
  FLASHCARD_STUDY_SUBMIT_ANSWER,
  FLASHCARD_STUDY_COMPLETE_SESSION,
} from '../slice';
import { studySessionsApi } from 'services';

const api = studySessionsApi;

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

function* getStudySession(action: any) {
  console.log('Saga: getStudySession called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARD_STUDY_GET_SESSION,
    api.getStudySession.bind(api),
  );
}

function* submitAnswer(action: any) {
  console.log('Saga: submitAnswer called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARD_STUDY_SUBMIT_ANSWER,
    api.submitAnswer.bind(api),
  );
}

function* completeSession(action: any) {
  console.log('Saga: completeSession called with action:', action);
  yield call(
    handleApiCall,
    action,
    FLASHCARD_STUDY_COMPLETE_SESSION,
    api.completeStudySession.bind(api),
  );
}

export function* flashcardStudySaga() {
  yield takeLatest(FLASHCARD_STUDY_GET_SESSION.TRIGGER, getStudySession);
  yield takeLatest(FLASHCARD_STUDY_SUBMIT_ANSWER.TRIGGER, submitAnswer);
  yield takeLatest(FLASHCARD_STUDY_COMPLETE_SESSION.TRIGGER, completeSession);
}
