import { call, put, takeLatest } from 'redux-saga/effects';
import {
  LESSON_GET_LESSON,
  LESSON_GET_VOCABULARY,
  LESSON_SUBMIT_ANSWER,
  LESSON_COMPLETE_LESSON,
} from '../slice';
import { lessonsApi, vocabulariesApi } from 'services';

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

function* getLesson(action: any) {
  console.log('Saga: getLesson called with action:', action);
  yield call(
    handleApiCall,
    action,
    LESSON_GET_LESSON,
    lessonsApi.getLesson.bind(lessonsApi),
  );
}

function* getVocabulary(action: any) {
  console.log('Saga: getVocabulary called with action:', action);
  yield call(
    handleApiCall,
    action,
    LESSON_GET_VOCABULARY,
    vocabulariesApi.getLessonVocabulary.bind(vocabulariesApi),
  );
}

function* submitAnswer(action: any) {
  console.log('Saga: submitAnswer called with action:', action);
  yield call(
    handleApiCall,
    action,
    LESSON_SUBMIT_ANSWER,
    lessonsApi.submitAnswer.bind(lessonsApi),
  );
}

function* completeLesson(action: any) {
  console.log('Saga: completeLesson called with action:', action);
  yield call(
    handleApiCall,
    action,
    LESSON_COMPLETE_LESSON,
    lessonsApi.completeLesson.bind(lessonsApi),
  );
}

export function* lessonSaga() {
  yield takeLatest(LESSON_GET_LESSON.TRIGGER, getLesson);
  yield takeLatest(LESSON_GET_VOCABULARY.TRIGGER, getVocabulary);
  yield takeLatest(LESSON_SUBMIT_ANSWER.TRIGGER, submitAnswer);
  yield takeLatest(LESSON_COMPLETE_LESSON.TRIGGER, completeLesson);
}
