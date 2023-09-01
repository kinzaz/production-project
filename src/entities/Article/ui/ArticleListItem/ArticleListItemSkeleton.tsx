import { FunctionComponent, memo } from 'react';
import styles from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ArticleView } from '@/entities/Article/model/types/article';

interface ArticleListItemSkeletonProps {
  view: ArticleView;
  className?: string;
}

export const ArticleListItemSkeleton: FunctionComponent<ArticleListItemSkeletonProps> =
  memo(({ view, className }) => {
    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(styles.ArticleListItem, {}, [
            className,
            styles[view],
          ])}
        >
          <Card>
            <div className={styles.header}>
              <Skeleton
                border="50%"
                width={30}
                height={30}
                className={styles.img}
              />
              <Skeleton width={150} height={16} className={styles.username} />
              <Skeleton width={150} height={16} className={styles.date} />
            </div>
            <Skeleton width={250} height={24} className={styles.title} />
            <Skeleton height={200} className={styles.img} />

            <div className={styles.footer}>
              <Skeleton height={30} width={200} />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div
        className={classNames(styles.ArticleListItem, {}, [
          className,
          styles[view],
        ])}
      >
        <Card>
          <div className={styles.imageWrapper}>
            <Skeleton width={200} height={200} className={styles.img} />
          </div>
          <div className={styles.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={styles.title} />
        </Card>
      </div>
    );
  });
