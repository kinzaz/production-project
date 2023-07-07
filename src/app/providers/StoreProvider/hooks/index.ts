import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createReduxStore } from '../config/store';

const store = createReduxStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
