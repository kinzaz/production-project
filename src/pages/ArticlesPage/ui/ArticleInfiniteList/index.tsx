import { ArticleList } from 'entities/Article/ui/ArticleList';
import { FunctionComponent } from 'react';
import styles from '../ArticlesPage.module.scss';
import { useSelector } from 'react-redux';
import { getArticles } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from 'pages/ArticlesPage/model/selectors';

export const ArticleInfiniteList: FunctionComponent = () => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  return (
    <ArticleList
      className={styles.list}
      view={view}
      isLoading={isLoading}
      articles={articles}
    />
  );
};
