import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async ({ username, password }, { dispatch, extra, rejectWithValue }) => {
        try {
            const response = await extra.api.post('/login', {
                username,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            console.error('loginByUsername request error', error);
            return rejectWithValue('Error');
        }
    },
);
