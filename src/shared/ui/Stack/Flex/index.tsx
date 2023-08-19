import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export type FlexJustify = 'start' | 'end' | 'center' | 'between';
export type FlexAlign = 'start' | 'end' | 'center' | 'between';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '32';

interface FlexProps {
  className?: string;
  justify: FlexJustify;
  align: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
}

const justifyClasses: Record<FlexJustify, string> = {
  between: styles.justifyBetween,
  center: styles.jusztifyCenter,
  end: styles.jusztifyEnd,
  start: styles.jusztifyStart,
};

const alignClasses: Record<FlexAlign, string> = {
  between: styles.AlignBetween,
  center: styles.AlignCenter,
  end: styles.AlignEnd,
  start: styles.AlignStart,
};

const directionClasses: Record<FlexDirection, string> = {
  column: styles.directionColumn,
  row: styles.directionRow,
};

const gapClasses: Record<FlexGap, string> = {
  '4': styles.gap4,
  '8': styles.gap8,
  '16': styles.gap16,
  '32': styles.gap32,
};

export const Flex: FunctionComponent<PropsWithChildren<FlexProps>> = ({
  children,
  className,
  justify = 'start',
  align = 'center',
  direction = 'row',
  gap,
}) => {
  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];
  return <div className={classNames(styles.Flex, {}, classes)}>{children}</div>;
};
