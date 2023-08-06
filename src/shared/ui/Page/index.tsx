import {
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';

export const Page: FunctionComponent<
  PropsWithChildren & { className?: string; onScrollEnd?: () => void }
> = ({ children, className, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  return (
    <section
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};
