import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './Tab.module.scss';

interface ITab {
  name?: never;
  isActive?: never;
  disabled?: boolean;
  value: string | number;
}

export const Tab: FunctionComponent<PropsWithChildren<ITab>> = (props) => {
  return (
    <label className={styles['tab']}>
      <input
        className={styles['tab__hidden-controller']}
        defaultChecked={props.isActive}
        disabled={props.disabled}
        name={props.name}
        type="radio"
        value={props.value}
      />
      <span className={styles['tab__label']}>{props.children}</span>
    </label>
  );
};
