import { call, put, takeLatest } from 'redux-saga/effects';
import { ADMIN_CONFIGURATIONS_GET_LIST } from '../slice';
import { configurationsApi } from 'services';

const api = configurationsApi;

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
    ADMIN_CONFIGURATIONS_GET_LIST,
    api.getConfigurations.bind(api),
  );
}

export function* adminConfigurationsSaga() {
  yield takeLatest(ADMIN_CONFIGURATIONS_GET_LIST.TRIGGER, getList);
}
