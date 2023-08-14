import {
  BaseSyntheticEvent,
  Children,
  FunctionComponent,
  PropsWithChildren,
  cloneElement,
  useRef,
} from 'react';
import styles from './index.module.scss';

interface ITabs<Value extends string = string> {
  onChange?(value: Value): void;
  value?: Value;
}

export const Tabs: FunctionComponent<PropsWithChildren<ITabs>> = (props) => {
  const { current: name } = useRef(Math.random());
  const onChange = (e: BaseSyntheticEvent) => {
    typeof props.onChange === 'function' && props.onChange(e.target.value);
  };

  return (
    <nav className={styles['tabs']} onChange={onChange}>
      {Children.map<any, any>(props.children, (child) =>
        cloneElement(child, {
          name,
          isActive:
            props.value !== undefined
              ? props.value === child.props.value
              : undefined,
        })
      )}
    </nav>
  );
};

/* eslint @typescript-eslint/no-explicit-any: 0 */
