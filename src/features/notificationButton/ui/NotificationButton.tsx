import { FunctionComponent } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Popover } from 'shared/ui/Popups';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Icon } from 'shared/ui/Icon';
import styles from './NotificationButton.module.scss';
import { NotificationList } from 'entities/Notifications';

export const NotificationButton: FunctionComponent = () => {
  return (
    <Popover
      direction="bottom left"
      trigger={
        <Button theme={ButtonTheme.CLEAR}>
          <Icon inverted Svg={NotificationIcon} />
        </Button>
      }
    >
      <NotificationList className={styles.notifications} />
    </Popover>
  );
};
