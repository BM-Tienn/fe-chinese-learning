import { useStore } from 'react-redux';
import {
  useInjectReducer as useInjectReducerBase,
  useInjectSaga as useInjectSagaBase,
} from 'redux-injectors';
import {
  RootStateKeyType,
  InjectReducerParams,
  InjectSagaParams,
} from './types/injector-typings';

export const useInjectReducer = <Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>,
) => useInjectReducerBase(params);

export const useInjectSaga = (params: InjectSagaParams) =>
  useInjectSagaBase(params);

export const useAppStore = () => useStore();
