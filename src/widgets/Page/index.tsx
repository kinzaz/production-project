import {
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  UIEvent,
  useRef,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './index.module.scss';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import {
  useAppDispatch,
  useAppSelector,
} from '@/app/providers/StoreProvider/hooks';
import {
  getScrollPlaceByPath,
  scrollPlaceActions,
} from '@/widgets/ScrollPlace';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps {
  className?: string;
  onScrollEnd?: () => void;
}

export const Page: FunctionComponent<PropsWithChildren<PageProps>> = (
  props
) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const scrollPosition = useAppSelector((state: StateSchema) =>
    getScrollPlaceByPath(state, pathname)
  );
  useInfiniteScroll({ triggerRef, wrapperRef, callback: props.onScrollEnd });

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
    <main
      ref={wrapperRef}
      className={classNames(styles.Page, {}, [props.className])}
      onScroll={onScroll}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {props.children}
      {props.onScrollEnd && <div className={styles.trigger} ref={triggerRef} />}
    </main>
  );
};
