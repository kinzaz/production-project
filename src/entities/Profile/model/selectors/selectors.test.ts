import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getProfileError } from './getProfileError';
import { getProfileForm } from './getProfileForm';
import { getProfileIsLoading } from './getProfileIsLoading';
import { getProfileReadonly } from './getProfileReadonly';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ValidateProfileError } from '../types/profile';

describe('getProfileData', () => {
  test('should return data', () => {
    const data = {
      username: 'vlad',
      lastname: 'Vlasenko',
      first: 'Vlad',
      age: '25',
      city: 'Gukovo',
      currency: Currency.EUR,
      country: Country.Russia,
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateSchema)).toEqual(data);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});

describe('getProfileError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        error: '123',
      },
    };
    expect(getProfileError(state as StateSchema)).toEqual('123');
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileError(state as StateSchema)).toEqual(undefined);
  });
});

describe('getProfileForm', () => {
  const form = {
    username: 'vlad',
    lastname: 'Vlasenko',
    first: 'Vlad',
    age: '25',
    city: 'Gukovo',
    currency: Currency.EUR,
    country: Country.Russia,
  };
  test('should return form', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        form,
      },
    };
    expect(getProfileForm(state as StateSchema)).toEqual(form);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileForm(state as StateSchema)).toEqual(undefined);
  });
});

describe('getProfileIsLoading', () => {
  test('should return loading true', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true,
      },
    };
    expect(getProfileIsLoading(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined);
  });
});

describe('getProfileReadonly', () => {
  test('should return readonly true', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileReadonly(state as StateSchema)).toEqual(true);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
  });
});

describe('getProfileReadonly', () => {
  test('should return validateError', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateError: [
          ValidateProfileError.INCORRECT_AGE,
          ValidateProfileError.SERVER_ERROR,
        ],
      },
    };
    expect(getProfileValidateErrors(state as StateSchema)).toEqual([
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.SERVER_ERROR,
    ]);
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
  });
});
