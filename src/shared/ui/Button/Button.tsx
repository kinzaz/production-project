import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  theme?: ThemeButton;
}

export const Button = ({
  className,
  children,
  theme,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.Button, {}, [className, styles[theme]])}
      {...props}
    >
      {children}
    </button>
  );
};
