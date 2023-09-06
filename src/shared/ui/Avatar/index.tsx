import { CSSProperties, FunctionComponent, useMemo } from 'react';
import style from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../AppImage';
import AvatarIcon from '../../assets/icons/avatar.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  src?: string;
  className?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  className,
  size,
  alt,
  fallbackInverted,
}) => {
  const styles = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  return (
    <AppImage
      alt={alt}
      fallback={<Skeleton width={size} height={size} />}
      errorFallback={<Icon inverted={fallbackInverted} Svg={AvatarIcon} />}
      className={classNames(style.Avatar, {}, [className])}
      src={src}
      style={styles}
    />
  );
};
