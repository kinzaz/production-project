import { FunctionComponent, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  INVERTED = 'inverted',
  ERROR = 'error',
}

export enum TextALign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center',
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextALign;
  size?: TextSize;
}

export const Text: FunctionComponent<TextProps> = memo(
  ({
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextALign.LEFT,
    size = TextSize.M,
  }) => {
    return (
      <div
        className={classNames(styles.Text, {}, [
          className,
          styles[theme],
          styles[align],
          styles[size],
        ])}
      >
        {title && <p className={styles.title}>{title}</p>}
        {text && <p className={styles.text}>{text}</p>}
      </div>
    );
  }
);
