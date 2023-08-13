import { ArticleView } from 'entities/Article';
import { ArticleList } from 'entities/Article/ui/ArticleList';
import { FunctionComponent, memo, useCallback } from 'react';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlePageSliceAction,
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
import { ArticleViewSwitcher } from 'features/SwitchArticleView';
import { Page } from 'widgets/Page';
import { fetchNewArticlesPage } from '../model/services/fetchNewArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage';

const reducers: ReducersList = {
  articlesPage: articlePageSliceReducer,
};

const ArticlesPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNewArticlesPage());
  }, [dispatch]);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageSliceAction.setView(view));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page onScrollEnd={onLoadNextPart}>
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
