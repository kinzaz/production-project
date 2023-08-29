import { FC, FunctionComponent, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';

interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  inverted?: boolean;
}

export const Icon: FunctionComponent<IconProps> = ({
  Svg,
  className,
  inverted,
}) => {
  return (
    <Svg
      className={classNames(inverted ? styles.inverted : styles.Icon, {}, [
        className,
      ])}
    ></Svg>
  );
};
