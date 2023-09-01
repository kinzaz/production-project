import { CSSProperties, FunctionComponent } from 'react';
import style from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SkeletonProps {
  height?: string | number;
  width?: string | number;
  border?: string;
  className?: string;
}

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  height,
  border,
  width,
  className,
}) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  };

  return (
    <div
      className={classNames(style.Skeleton, {}, [className])}
      style={styles}
    ></div>
  );
};
