import { FunctionComponent } from 'react';
import styles from './ScrollPlace.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export const ScrollPlace: FunctionComponent = () => {
  return <div className={classNames(styles.ScrollPlace, {}, [])}></div>;
};
