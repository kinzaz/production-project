import {
  useAppDispatch,
  useAppSelector,
} from 'app/providers/StoreProvider/hooks';
import {
  ArticleSortField,
  ArticleSortSelector,
  ArticleType,
  ArticleView,
} from 'entities/Article';
import { ArticleViewSwitcher } from 'features/SwitchArticleView';
import {
  getArticlesOrder,
  getArticlesPageView,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType,
} from 'pages/ArticlesPage/model/selectors';
import { articlePageSliceAction } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styles from './index.module.scss';
import { Card } from 'shared/ui/Card';
import { Input } from 'shared/ui/Input/Input';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import { ArticleTypeTabs } from 'entities/Article/ui/ArticleTypeTabs';

export const ArticlePageFilters: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const view = useSelector(getArticlesPageView);
  const { t } = useTranslation();
  const sort = useAppSelector(getArticlesSort);
  const order = useAppSelector(getArticlesOrder);
  const search = useAppSelector(getArticlesSearch);
  const type = useAppSelector(getArticlesType);

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ page: 1, replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, 500);

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlePageSliceAction.setView(view));
      dispatch(articlePageSliceAction.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const onChangeSort = useCallback(
    (sort: ArticleSortField) => {
      dispatch(articlePageSliceAction.setSort(sort));
      dispatch(articlePageSliceAction.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlePageSliceAction.setOrder(order));
      dispatch(articlePageSliceAction.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const onChangeSearch = useCallback(
    (search: SortOrder) => {
      dispatch(articlePageSliceAction.setSearch(search));
      dispatch(articlePageSliceAction.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const checkoutHandler = (tab: ArticleType) => {
    dispatch(articlePageSliceAction.setType(tab));
    dispatch(articlePageSliceAction.setPage(1));
    fetchData();
  };

  return (
    <div>
      <div className={styles.sortWrapper}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onChangeOrder}
          onChangeSort={onChangeSort}
        />
        <ArticleViewSwitcher view={view} onViewClick={onChangeView} />
      </div>
      <Card className={styles.search}>
        <Input
          onChange={onChangeSearch}
          value={search}
          placeholder={t('Поиск')}
        />
      </Card>
      <ArticleTypeTabs checkoutHandler={checkoutHandler} type={type} />
    </div>
  );
};
