import { Currency } from 'entities/Currency';
import { ProfileSchema, ValidateProfileError } from '../types/profile';
import { profileActions, profileReducer } from './ProfileSlice';
import { Country } from 'entities/Country';
import { updateProfileData } from '../services/updateProfileData';

const data = {
  username: 'vlad',
  lastname: 'Vlasenko',
  first: 'Vlad',
  age: '25',
  city: 'Gukovo',
  currency: Currency.EUR,
  country: Country.Russia,
};

describe('ProfileSlice test', () => {
  test('set readonly', () => {
    const state: DeepPartial<ProfileSchema> = {
      readonly: false,
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadonly(true))
    ).toEqual({ readonly: true });
  });

  test('cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: '' },
    };

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({ data, form: data, readonly: true, validateError: undefined });
  });

  test('update profile', () => {
    const state: DeepPartial<ProfileSchema> = {
      data,
      form: { username: '123' },
      readonly: true,
      validateError: undefined,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({
          username: '12345',
        })
      )
    ).toEqual({
      data,
      form: { username: '12345' },
      readonly: true,
      validateError: undefined,
    });
  });

  test('update profile service pending', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateError: [ValidateProfileError.INCORRECT_AGE],
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({ isLoading: true, validateError: undefined });
  });

  test('update profile service fulfilled', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
    };

    expect(
      profileReducer(
        state as ProfileSchema,
        updateProfileData.fulfilled(data, '')
      )
    ).toEqual({
      isLoading: false,
      validateError: undefined,
      readonly: true,
      form: data,
      data,
    });
  });
});
