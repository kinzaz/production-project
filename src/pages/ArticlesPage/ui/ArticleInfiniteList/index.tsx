import { ArticleList } from '@/entities/Article/ui/ArticleList';
import { FunctionComponent } from 'react';
import styles from '../ArticlesPage.module.scss';
import { useSelector } from 'react-redux';
import { getArticles } from '@/pages/ArticlesPage/model/slices/articlePageSlice';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '@/pages/ArticlesPage/model/selectors';
import { useAppSelector } from '@/app/providers/StoreProvider/hooks';

export const ArticleInfiniteList: FunctionComponent = () => {
  const articles = useAppSelector(getArticles.selectAll);
  const isLoading = useAppSelector(getArticlesPageIsLoading);
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
