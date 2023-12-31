import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './LoginForm.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import {
    loginActions,
    loginReducer,
} from '@/features/AuthByUsername/model/slice/loginSlice';
import { loginByUsername } from '@/features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { useSelector } from 'react-redux';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { getLoginUsername } from '@/features/AuthByUsername/model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '@/features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '@/features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '@/features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm: FunctionComponent<LoginFormProps> = memo(
    ({ className, onSuccess }) => {
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const username = useSelector(getLoginUsername);
        const password = useSelector(getLoginPassword);
        const isLoading = useSelector(getLoginIsLoading);
        const error = useSelector(getLoginError);

        const onChangeUsername = useCallback(
            (value: string) => {
                dispatch(loginActions.setUsername(value));
            },
            [dispatch],
        );

        const onChangePassword = useCallback(
            (value: string) => {
                dispatch(loginActions.setPassword(value));
            },
            [dispatch],
        );

        const onLoginClick = useCallback(async () => {
            const result = await dispatch(
                loginByUsername({ password, username }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        }, [dispatch, password, username, onSuccess]);

        return (
            <DynamicModuleLoader reducers={initialReducers}>
                <div className={classNames(styles.LoginForm, {}, [className])}>
                    <Text title={t('Форма авторизации')} />
                    {error && (
                        <Text
                            text={t('Вы ввели неверный логин или пароль')}
                            theme={TextTheme.ERROR}
                        />
                    )}
                    <Input
                        className={styles.input}
                        placeholder={t('Введите username')}
                        type="text"
                        authfocus
                        onChange={onChangeUsername}
                        value={username}
                    />
                    <Input
                        className={styles.input}
                        placeholder={t('Введите пароль')}
                        type="text"
                        onChange={onChangePassword}
                        value={password}
                    />
                    <Button
                        disabled={isLoading}
                        theme={ButtonTheme.OUTLINE}
                        className={styles.loginBtn}
                        onClick={onLoginClick}
                    >
                        {t('Войти')}
                    </Button>
                </div>
            </DynamicModuleLoader>
        );
    },
);

export default LoginForm;
