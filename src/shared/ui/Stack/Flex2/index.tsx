import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

export type FlexJustify = 'start' | 'end' | 'center' | 'space-between';
export type FlexAlign = 'start' | 'end' | 'center' | 'space-between';
export type FlexDirection = 'row' | 'column';
export type FlexGap = 4 | 8 | 16 | 32;

interface FlexProps {
  className?: string;
  justify: FlexJustify;
  align: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
}

export const Flex2: FunctionComponent<PropsWithChildren<FlexProps>> = ({
  children,
  className,
  justify = 'start',
  align = 'center',
  direction = 'row',
  gap,
}) => {
  const classes = [
    className,
    styles[`flex--justify-${justify}`],
    styles[`flex--align-${align}`],
    styles[`flex--direction-${direction}`],
  ];

  const mod: Mods = {
    [styles[`flex--gap-${gap}`]]: gap,
  };

  return (
    <div className={classNames(styles.Flex, mod, classes)}>{children}</div>
  );
};
