import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getArticlesInited } from '../selectors';
import { articlePageSliceAction } from '../slices/articlePageSlice';
import { fetchArticlesList } from './fetchArticlesList';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';

export const initArticlesPage = createAsyncThunk<
  void,
  URLSearchParams,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const inited = getArticlesInited(getState());

  if (!inited) {
    const orderFromUrl = searchParams.get('order') as SortOrder;
    const sortFromUrl = searchParams.get('sort') as ArticleSortField;
    const searchFromUrl = searchParams.get('search');
    const typeFromUrl = searchParams.get('type') as ArticleType;

    if (orderFromUrl) {
      dispatch(articlePageSliceAction.setOrder(orderFromUrl));
    }
    if (sortFromUrl) {
      dispatch(articlePageSliceAction.setSort(sortFromUrl));
    }
    if (searchFromUrl) {
      dispatch(articlePageSliceAction.setSearch(searchFromUrl));
    }
    if (typeFromUrl) {
      dispatch(articlePageSliceAction.setType(typeFromUrl));
    }

    dispatch(articlePageSliceAction.initState());
    dispatch(
      fetchArticlesList({
        page: 1,
      })
    );
  }
});
