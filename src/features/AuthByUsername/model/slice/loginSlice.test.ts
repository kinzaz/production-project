import { DeepPartial } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice test', () => {
  test('set username', () => {
    const state: DeepPartial<LoginSchema> = {
      username: 'admin',
      password: '123',
    };

    expect(
      loginReducer(state as LoginSchema, loginActions.setUsername('new admin'))
    ).toEqual({
      username: 'new admin',
      password: '123',
    });
  });

  test('set password', () => {
    const state: DeepPartial<LoginSchema> = {
      username: 'admin',
      password: '123',
    };

    expect(
      loginReducer(state as LoginSchema, loginActions.setPassword('000'))
    ).toEqual({
      username: 'admin',
      password: '000',
    });
  });
});
