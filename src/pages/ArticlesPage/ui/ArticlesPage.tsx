import { ArticleList } from 'entities/Article/ui/ArticleList';
import { FunctionComponent, memo, useCallback } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlePageSliceReducer,
  getArticles,
} from '../model/slices/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { useSelector } from 'react-redux';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../model/selectors';
import { Page } from 'widgets/Page';
import { fetchNewArticlesPage } from '../model/services/fetchNewArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage';
import { ArticlePageFilters } from './ArticlePageFilters';
import styles from './ArticlesPage.module.scss';
import { useSearchParams } from 'react-router-dom';

const reducers: ReducersList = {
  articlesPage: articlePageSliceReducer,
};

const ArticlesPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNewArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart}>
        <ArticlePageFilters />
        <ArticleList
          className={styles.list}
          view={view}
          isLoading={isLoading}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
