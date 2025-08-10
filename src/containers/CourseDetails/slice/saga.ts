import { call, put, takeLatest } from 'redux-saga/effects';
import {
  COURSE_DETAILS_GET_COURSE,
  COURSE_DETAILS_GET_LESSONS,
  COURSE_DETAILS_UPDATE_PROGRESS,
} from '../slice';
import { coursesApi } from 'services';

const api = coursesApi;

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

function* getCourse(action: any) {
  console.log('Saga: getCourse called with action:', action);
  yield call(
    handleApiCall,
    action,
    COURSE_DETAILS_GET_COURSE,
    api.getCourse.bind(api),
  );
}

function* getLessons(action: any) {
  console.log('Saga: getLessons called with action:', action);
  yield call(
    handleApiCall,
    action,
    COURSE_DETAILS_GET_LESSONS,
    api.getCourseLessons.bind(api),
  );
}

function* updateProgress(action: any) {
  console.log('Saga: updateProgress called with action:', action);
  yield call(
    handleApiCall,
    action,
    COURSE_DETAILS_UPDATE_PROGRESS,
    api.updateCourseProgress.bind(api),
  );
}

export function* courseDetailsSaga() {
  yield takeLatest(COURSE_DETAILS_GET_COURSE.TRIGGER, getCourse);
  yield takeLatest(COURSE_DETAILS_GET_LESSONS.TRIGGER, getLessons);
  yield takeLatest(COURSE_DETAILS_UPDATE_PROGRESS.TRIGGER, updateProgress);
}
