import { useTheme } from 'app/providers/ThemeProvider';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  children,
  className,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();

  const mods: Mods = {
    [styles.opened]: isOpen,
  };

  return (
    <Portal>
      <div
        className={classNames(styles.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={onClose} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};
