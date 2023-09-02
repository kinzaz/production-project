import React, {
  InputHTMLAttributes,
  memo,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Input.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  value?: string | number;
  onChange?(value: unknown): void;
  authfocus?: boolean;
  readonly?: boolean;
}

export const Input = memo(
  ({
    onChange,
    value,
    className,
    type = 'text',
    placeholder,
    authfocus,
    readonly,
    ...props
  }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const mods: Mods = {
      [styles['readonly']]: readonly,
    };

    const isCaretVisible = isFocused && !readonly;

    useEffect(() => {
      if (authfocus) {
        setIsFocused(true);
        ref.current?.focus();
      }
    }, [authfocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0);
    };

    return (
      <div className={classNames(styles.InputWrapper, mods, [className])}>
        {placeholder && (
          <div className={styles.placeholder}>{`${placeholder}>`}</div>
        )}
        <div className={styles.caretWrapper}>
          <input
            className={styles.input}
            onChange={onChangeHandler}
            type={type}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            ref={ref}
            readOnly={readonly}
            {...props}
          />
          {isCaretVisible && (
            <span
              className={styles.caret}
              style={{ left: `${caretPosition * 9}px` }}
            />
          )}
        </div>
      </div>
    );
  }
);
