import { FunctionComponent } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './index.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay: FunctionComponent<OverlayProps> = ({
  className,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles.Overlay, {}, [className])}
    />
  );
};
