import { FunctionComponent, memo, useCallback } from 'react';
import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';
import { Page } from '@/widgets/Page';
import { fetchNewArticlesPage } from '../model/services/fetchNewArticlesPage';
import { ArticlePageFilters } from './ArticlePageFilters';
import { ArticleInfiniteList } from './ArticleInfiniteList';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { initArticlesPage } from '../model/services/initArticlesPage';
import { useSearchParams } from 'react-router-dom';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articlePageSliceReducer } from '../model/slices/articlePageSlice';

const reducers: ReducersList = {
  articlesPage: articlePageSliceReducer,
};

const ArticlesPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNewArticlesPage());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page data-testid="ArticlePage" onScrollEnd={onLoadNextPart}>
        <ArticlePageFilters />
        <ArticleInfiniteList />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
