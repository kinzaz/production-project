import { FunctionComponent, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FunctionComponent<LoginFormProps>>(
    () => import('./LoginForm'),
);
