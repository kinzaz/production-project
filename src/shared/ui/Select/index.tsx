import { ChangeEvent, useMemo } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  label?: string;
  className?: string;
  options?: SelectOption<T>[];
  value?: T;
  readonly?: boolean;
  onChange?: (value: T) => void;
}

export const Select = <T extends string>({
  className,
  label,
  options,
  value,
  readonly,
  onChange,
}: SelectProps<T>) => {
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e.target.value as T);
  };

  const optionsList = useMemo(() => {
    return options?.map((option) => (
      <option
        className={styles.option}
        value={option.value}
        key={option.content}
      >
        {option.content}
      </option>
    ));
  }, [options]);

  return (
    <div className={classNames(styles.Wrapper, {}, [className])}>
      {label && <span className={styles.label}>{`${label}` + '>'}</span>}
      <select
        disabled={readonly}
        className={styles.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
};
