import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ScrollPlaceSchema } from '../types/ScrollPlaceSchema';

const initialState: ScrollPlaceSchema = {
  scroll: {},
};

export const scrollPlaceSlice = createSlice({
  name: 'scrollPlaceSlice',
  initialState,
  reducers: {
    setScrollPosition(
      state,
      { payload }: PayloadAction<{ path: string; position: number }>
    ) {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: scrollPlaceActions } = scrollPlaceSlice;
export const { reducer: scrollPlaceReducer } = scrollPlaceSlice;
