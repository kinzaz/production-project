import { useTheme } from '@/app/providers/ThemeProvider';
import {
  FunctionComponent,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay';
import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider/AnimationProvider';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;

export const DrawerContent: FunctionComponent<PropsWithChildren<DrawerProps>> =
  ({ children, className, isOpen, onClose }) => {
    const { Gesture, Spring } = useAnimationLibs();

    const { theme } = useTheme();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
      api.start({
        y: 0,
        immediate: false,
      });
    }, [api]);

    useEffect(() => {
      if (isOpen) {
        openDrawer();
      }
    }, [isOpen, openDrawer, api]);

    const close = (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
        onResolve: onClose,
      });
    };

    const bind = Gesture.useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel,
      }) => {
        if (my < -70) cancel();

        if (last) {
          if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
            close();
          } else {
            openDrawer();
          }
        } else {
          api.start({ y: my, immediate: true });
        }
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      }
    );

    if (!isOpen) {
      return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
      <Portal>
        <div
          className={classNames(styles.Drawer, {}, [
            className,
            theme,
            'app_drawer',
          ])}
        >
          <Overlay onClick={onClose} />
          <Spring.a.div
            className={styles.sheet}
            {...bind()}
            style={{ display, bottom: `calc(-100vh + ${height - 100}px`, y }}
          >
            {children}
          </Spring.a.div>
        </div>
      </Portal>
    );
  };

export const Drawer = memo<PropsWithChildren<DrawerProps>>((props) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) return null;

  return <DrawerContent {...props} />;
});
