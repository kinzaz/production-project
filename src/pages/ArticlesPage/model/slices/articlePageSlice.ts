import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleView } from 'entities/Article';
import { ArticlesPageSchema } from '../types/ArticlePageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList';
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/consts/localStorage';

const articlesAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articlesAdapter.getInitialState()
);

const ArticlePageSlice = createSlice({
  name: 'ArticlePageSlice',
  initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
    isLoading: false,
    error: '',
    ids: [],
    entities: {},
    view: ArticleView.SMALL,
    page: 1,
    hasMore: true,
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload;
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView;
      state.view = view;
      state.limit = view === ArticleView.BIG ? 4 : 8;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesList.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticlesList.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        articlesAdapter.addMany(state, action.payload);
        state.hasMore = action.payload.length > 0;
      }
    );
    builder.addCase(fetchArticlesList.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  actions: articlePageSliceAction,
  reducer: articlePageSliceReducer,
} = ArticlePageSlice;
