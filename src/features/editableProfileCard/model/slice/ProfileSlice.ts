import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../../../entities/Profile/model/types/profile';
import { fetchProfileData } from '../services/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData';
import { ProfileSchema } from '../types/editableProfileCardSchema';

const initialState: ProfileSchema = {
  readonly: true,
  isLoading: false,
  error: undefined,
  data: undefined,
  form: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      return { ...state, readonly: action.payload };
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state.form = { ...state.form, ...action.payload };
    },
    cancelEdit: (state) => {
      state.readonly = true;
      state.form = state.data;
      state.validateError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchProfileData.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
      }
    );
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateProfileData.pending, (state) => {
      state.validateError = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      updateProfileData.fulfilled,
      (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.form = action.payload;
        state.readonly = true;
        state.validateError = undefined;
      }
    );
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.validateError = action.payload;
      state.isLoading = false;
    });
  },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
