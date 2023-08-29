import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Dropdown, Popover } from 'shared/ui/Popups';
import { Avatar } from 'shared/ui/Avatar';
import { HStack } from 'shared/ui/Stack/HStack';
import { Icon } from 'shared/ui/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;
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
      <header className={classNames(styles.navbar, {}, [className])}>
        <Text
          theme={TextTheme.INVERTED}
          className={styles.appName}
          title="Logo"
        />
        <AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.article_create}>
          {t('Создать статью')}
        </AppLink>
        <HStack gap="16" className={styles.actions}>
          <Popover
            direction="bottom left"
            trigger={
              <Button theme={ButtonTheme.CLEAR}>
                <Icon inverted Svg={NotificationIcon} />
              </Button>
            }
          >
            fddfsfdsd
          </Popover>

          <Dropdown
            className={styles.dropdown}
            items={[
              ...(isAdminPanelAvailable
                ? [
                    {
                      content: t('Админка'),
                      href: RoutePath.admin,
                    },
                  ]
                : []),
              {
                content: t('Профиль'),
                href: RoutePath.profile + authData.id,
              },
              {
                content: t('Выйти'),
                onClicK: onLogout,
              },
            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
          />
        </HStack>
      </header>
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
