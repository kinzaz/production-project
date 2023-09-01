import { FunctionComponent } from 'react';
import styles from './index.module.scss';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';

interface IDivider {
  margin?: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32;
}

export const Divider: FunctionComponent<IDivider> = ({ margin }) => {
  const mod: Mods = {
    [styles[`divider--margin-${margin}`]]: margin,
  };

  return <hr className={classNames(styles.divider, mod, [])} />;
};
