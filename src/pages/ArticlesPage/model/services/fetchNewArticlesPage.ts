import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum,
} from '../selectors';
import { articlePageSliceAction } from '../slices/articlePageSlice';
import { fetchArticlesList } from './fetchArticlesList';

export const fetchNewArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/fetchNewArticlesPage', async (_, thunkApi) => {
  const { getState, dispatch } = thunkApi;
  const hasMore = getArticlesPageHasMore(getState());
  const page = getArticlesPageNum(getState());
  const isLoading = getArticlesPageIsLoading(getState());

  if (hasMore && !isLoading) {
    dispatch(articlePageSliceAction.setPage(page + 1));
    dispatch(
      fetchArticlesList({
        page: page + 1,
      })
    );
  }
});
