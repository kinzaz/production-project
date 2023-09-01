import { useTheme } from 'app/providers/ThemeProvider';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay';
import { useModal } from 'shared/lib/hooks/useModal';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Drawer: FunctionComponent<PropsWithChildren<DrawerProps>> = ({
  children,
  className,
  isOpen,
  onClose,
  lazy,
}) => {
  const { theme } = useTheme();

  const { close, isClosing, isMounted } = useModal({
    onClose,
    isOpen,
    animationDelay: 300,
  });

  const mods: Mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(styles.Drawer, mods, [
          className,
          theme,
          'app_drawer',
        ])}
      >
        <Overlay onClick={close} />
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>
  );
};
