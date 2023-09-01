import { FunctionComponent, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Popover } from 'shared/ui/Popups';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Icon } from 'shared/ui/Icon';
import styles from './NotificationButton.module.scss';
import { NotificationList } from 'entities/Notifications';
import { Drawer } from 'shared/ui/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider/AnimationProvider';

export const NotificationButton: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = (
    <Button onClick={() => setIsOpen(true)} theme={ButtonTheme.CLEAR}>
      <Icon inverted Svg={NotificationIcon} />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover direction="bottom left" trigger={trigger}>
          <NotificationList className={styles.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <AnimationProvider>
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NotificationList />
          </Drawer>
        </AnimationProvider>
      </MobileView>
    </div>
  );
};
