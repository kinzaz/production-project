import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
  getArticlesOrder,
  getArticlesPageLimit,
  getArticlesSearch,
  getArticlesSort,
} from '../selectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams';

interface FetchArticlesListProps {
  page?: number;
  replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
  Article[],
  FetchArticlesListProps,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesList',
  async ({ page = 1 }, { extra, rejectWithValue, getState }) => {
    const limit = getArticlesPageLimit(getState());
    const sort = getArticlesSort(getState());
    const order = getArticlesOrder(getState());
    const search = getArticlesSearch(getState());

    try {
      addQueryParams({ sort, order, search });
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
        },
      });
      if (!response.data) throw new Error();
      return response.data;
    } catch (error) {
      console.error('fetchArticlesList request error', error);
      return rejectWithValue('Error');
    }
  }
);
