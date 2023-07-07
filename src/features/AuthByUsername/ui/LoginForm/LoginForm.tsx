import { Dispatch, FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './LoginForm.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FunctionComponent<LoginFormProps> = memo(
  ({ className }) => {
    const { username, password, isLoading, error } = useSelector(getLoginState);
    const dispatch: Dispatch<any> = useDispatch();
    const onChangeUsername = useCallback(
      (value: string) => {
        dispatch(loginActions.setUsername(value));
      },
      [dispatch]
    );

    const onChangePassword = useCallback(
      (value: string) => {
        dispatch(loginActions.setPassword(value));
      },
      [dispatch]
    );

    const onLoginClick = () => {
      dispatch(loginByUsername({ password, username }));
    };

    const { t } = useTranslation();
    return (
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
    );
  }
);
