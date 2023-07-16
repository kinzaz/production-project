import { ChangeEvent, FunctionComponent, memo, useMemo } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  label?: string;
  className?: string;
  options?: SelectOption[];
  value?: string;
  readonly: boolean;
  onChange?: (value: string) => void;
}

export const Select: FunctionComponent<SelectProps> = memo(
  ({ className, label, options, value, readonly, onChange }) => {
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange && onChange(e.target.value);
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
  }
);
