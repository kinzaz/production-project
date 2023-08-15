import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const { t } = useTranslation();

  if (authData) {
    return (
      <div className={classNames(styles.navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={styles.appName}
          title="Logo"
        />
        <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.article_create}>
          {t('Создать статью')}
        </AppLink>
        <Button
          onClick={onLogout}
          theme={ButtonTheme.CLEAR_INVERTED}
          className={styles.links}
        >
          {t('Выйти')}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <Button
        onClick={onShowModal}
        theme={ButtonTheme.CLEAR_INVERTED}
        className={styles.links}
      >
        {t('Войти')}
      </Button>
      {isOpen && <LoginModal isOpen={isOpen} onClose={onCloseModal} />}
    </div>
  );
});
