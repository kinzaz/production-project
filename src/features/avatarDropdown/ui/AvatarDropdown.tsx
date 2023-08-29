import { FunctionComponent, useCallback } from 'react';
import styles from './AvatarDropdown.module.scss';
import { Dropdown } from 'shared/ui/Popups';
import { Avatar } from 'shared/ui/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTranslation } from 'react-i18next';

export const AvatarDropdown: FunctionComponent = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;
  const authData = useSelector(getUserAuthData);
  const { t } = useTranslation();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  return (
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
  );
};
