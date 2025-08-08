import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_USER_GOALS_GET_LIST } from '../slice';
import { userGoalsApi } from 'services';

const api = userGoalsApi;

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
    ADMIN_USER_GOALS_GET_LIST,
    api.getAllUserGoals.bind(api),
  );
}

export function* adminUserGoalsSaga() {
  yield takeLatest(ADMIN_USER_GOALS_GET_LIST.TRIGGER, getList);
}
