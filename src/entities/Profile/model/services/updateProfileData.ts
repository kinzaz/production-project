import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile, ValidateProfileError } from '../types/profile';
import { getProfileForm } from '../selectors/getProfileForm';
import { validateProfile } from './validateProfile';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>(
  'profile/updateProfileData',
  async (_, { extra, rejectWithValue, getState }) => {
    const formData = getProfileForm(getState());
    const errors = validateProfile(formData);

    if (errors.length) {
      return rejectWithValue(errors);
    }

    try {
      const response = await extra.api.put<Profile>('/profile', formData);
      if (!response.data) throw new Error();
      return response.data;
    } catch (error) {
      console.error('updateProfileData request error', error);
      return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
  }
);
