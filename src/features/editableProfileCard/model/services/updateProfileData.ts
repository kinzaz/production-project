import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getProfileForm } from '../selectors/getProfileForm';
import { validateProfile } from './validateProfile';
import { ValidateProfileError } from '../types/editableProfileCardSchema';
import { Profile } from '@/entities/Profile';

export const updateProfileData = createAsyncThunk<
    Profile,
    string,
    ThunkConfig<ValidateProfileError[]>
>(
    'profile/updateProfileData',
    async (id, { extra, rejectWithValue, getState }) => {
        const formData = getProfileForm(getState());
        const errors = validateProfile(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>(
                '/profile/' + id,
                formData,
            );
            if (!response.data) throw new Error();
            return response.data;
        } catch (error) {
            console.error('updateProfileData request error', error);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
