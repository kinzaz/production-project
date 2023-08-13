import {
  CombinedState,
  Reducer,
  ReducersMapObject,
  configureStore,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { StateSchema, ThunkExtraArgs } from './StateSchema';
import { userReducer } from 'entities/User';
import { createReducerManager } from './reducerManager';
import { $api } from 'shared/api/api';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  };

  const reducerManager = createReducerManager(rootReducer);

  const extraArgs: ThunkExtraArgs = {
    api: $api,
  };

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgs,
        },
      }),
  });

  /* @ts-ignore */
  store.reducerManager = reducerManager;

  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
