import { CSSProperties, FunctionComponent, useMemo } from 'react';
import style from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AvatarProps {
  src?: string;
  className?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  className,
  size,
  alt,
}) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  return (
    <img
      alt={alt}
      className={classNames(style.Avatar, {}, [className])}
      src={src}
      style={styles}
    />
  );
};
