import { Article, ArticleView } from 'entities/Article/model/types/article';
import { FunctionComponent } from 'react';
import { ArticleListItem } from '../ArticleListItem';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  className?: string;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((_, i) => (
      <ArticleListItemSkeleton className={styles.card} key={i} view={view} />
    ));

export const ArticleList: FunctionComponent<ArticleListProps> = ({
  articles,
  isLoading,
  className,
  view = ArticleView.SMALL,
}) => {
  const renderArticleList = (article: Article) => {
    return (
      <ArticleListItem
        key={article.id}
        className={styles.card}
        article={article}
        view={view}
      />
    );
  };

  if (!isLoading && !articles.length) {
    return (
      <div
        className={classNames(styles.ArticleList, {}, [
          className,
          styles[view],
        ])}
      >
        Статьи нет.
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.ArticleList, {}, [className, styles[view]])}
    >
      {articles.length > 0 ? articles.map(renderArticleList) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};
