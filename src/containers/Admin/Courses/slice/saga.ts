import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_COURSES_GET_LIST } from '../slice';
import { coursesApi } from 'services';

const api = coursesApi;

function* handleApiCall(
  action: { payload: { params: any } },
  routine: { success: (arg0: any) => any; failure: () => any },
  api: any,
) {
  const { params } = action.payload;
  try {
    console.log('Saga: Calling API with params:', params);

    const response = yield call(api, params);
    console.log('Saga: API response:', response);

    yield put(routine.success(response));
  } catch (err: any) {
    console.error('Saga: API call failed:', err);
    console.error('Saga: Error details:', {
      message: err?.message,
      stack: err?.stack,
      response: err?.response?.data,
    });
    yield put(routine.failure());
  }
}

function* getList(action: any) {
  console.log('Saga: getList called with action:', action);
  yield call(
    handleApiCall,
    action,
    ADMIN_COURSES_GET_LIST,
    api.getAllCourses.bind(api),
  );
}

export function* adminCoursesSaga() {
  yield takeLatest(ADMIN_COURSES_GET_LIST.TRIGGER, getList);
}
