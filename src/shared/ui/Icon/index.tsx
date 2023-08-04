import { FC, FunctionComponent, SVGProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';

interface IconProps {
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const Icon: FunctionComponent<IconProps> = ({ Svg, className }) => {
  return <Svg className={classNames(styles.Icon, {}, [className])}></Svg>;
};
