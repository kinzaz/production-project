import {
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  UIEvent,
  useEffect,
  useRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll';
import {
  useAppDispatch,
  useAppSelector,
} from 'app/providers/StoreProvider/hooks';
import { getScrollPlaceByPath, scrollPlaceActions } from 'widgets/ScrollPlace';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle';

export const Page: FunctionComponent<
  PropsWithChildren & { className?: string; onScrollEnd?: () => void }
> = ({ children, className, onScrollEnd }) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const scrollPosition = useAppSelector((state: StateSchema) =>
    getScrollPlaceByPath(state, pathname)
  );
  useInfiniteScroll({ triggerRef, wrapperRef, callback: onScrollEnd });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollPlaceActions.setScrollPosition({
        path: pathname,
        position: e.currentTarget.scrollTop,
      })
    );
  }, 500);

  return (
    <section
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  );
};
