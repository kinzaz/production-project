import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { Portal } from '@/shared/ui/Portal/Portal';
import cls from './Modal.module.scss';
import { Overlay } from '../Overlay';
import { useModal } from '@/shared/lib/hooks/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { children, className, isOpen, lazy, onClose } = props;
  const { close, isClosing, isMounted } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });
  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className, theme])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
