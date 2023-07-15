import { FunctionComponent, memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import styles from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { SidebarItemType } from 'widgets/Sidebar/model/items';
import { classNames } from 'shared/lib/classNames/classNames';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = memo(
  ({ collapsed, item }) => {
    const { t } = useTranslation();

    return (
      <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={classNames(
          styles.item,
          { [styles.collapsed]: collapsed },
          []
        )}
      >
        <item.Icon className={styles.icon} />
        <span className={styles.link}>{t(item.text)}</span>
      </AppLink>
    );
  }
);
