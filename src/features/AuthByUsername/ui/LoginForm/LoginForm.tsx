import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './LoginForm.module.scss';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FunctionComponent<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Input
        className={styles.input}
        placeholder={t('Введите username')}
        type="text"
        authfocus
      />
      <Input
        className={styles.input}
        placeholder={t('Введите пароль')}
        type="text"
      />
      <Button className={styles.loginBtn}>{t('Войти')}</Button>
    </div>
  );
};
