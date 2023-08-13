import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticlesInited } from '../selectors';
import { articlePageSliceAction } from '../slices/articlePageSlice';
import { fetchArticlesList } from './fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
  const { dispatch, getState } = thunkApi;
  const inited = getArticlesInited(getState());

  if (!inited) {
    dispatch(articlePageSliceAction.initState());
    dispatch(
      fetchArticlesList({
        page: 1,
      })
    );
  }
});
