import { Fragment, FunctionComponent, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { HStack } from '../Stack/HStack';
import { DropDownDirection } from 'shared/types/ui';

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
  label?: string;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': styles.optionsBottomLeft,
  'bottom right': styles.optionsBottomRight,
  'top left': styles.optionsTopLeft,
  'top right': styles.optionsTopRight,
};

export const Listbox: FunctionComponent<ListBoxProps> = ({
  className,
  items,
  value,
  defaultValue,
  onChange,
  readonly,
  direction = 'bottom left',
  label,
}) => {
  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack>
      {label && <span>{label + '>'}</span>}
      <HListBox
        as="div"
        className={classNames(styles.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListBox.Button className={styles.trigger}>
          <Button> {value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(styles.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              as={Fragment}
              key={item.value}
              value={item.value}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    styles.option,
                    {
                      [styles.active]: active,
                      [styles.disabled]: item.disabled,
                    },
                    []
                  )}
                >
                  {selected && '!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};
