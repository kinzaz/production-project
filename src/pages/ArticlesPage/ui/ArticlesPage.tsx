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
import { fetchArticlesList } from '../model/services/fetchArticlesList';
import { useSelector } from 'react-redux';
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../model/selectors';
import { ArticleViewSwitcher } from 'features/SwitchArticleView';

const reducers: ReducersList = {
  articlesPage: articlePageSliceReducer,
};

const ArticlesPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const view = useSelector(getArticlesPageView);

  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlePageSliceAction.initState());
  });

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageSliceAction.setView(view));
    },
    [dispatch]
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div>
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
        <ArticleList view={view} isLoading={isLoading} articles={articles} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticlesPage);
