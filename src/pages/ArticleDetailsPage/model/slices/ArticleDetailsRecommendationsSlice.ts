import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';
import { Article } from 'entities/Article';
import { fetchArticlesRecommendations } from '../services/fetchArticleRecommendations';

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

export const getArticleRecommendations =
  recommendationsAdapter.getSelectors<StateSchema>(
    (state) =>
      state.articleDetailsPage?.recommendation ||
      recommendationsAdapter.getInitialState()
  );

const ArticleDetailsRecommendstionsSlice = createSlice({
  name: 'ArticleDetailsRecommendstionsSlice',
  initialState:
    recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
      {
        isLoading: false,
        error: '',
        ids: [],
        entities: {},
      }
    ),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticlesRecommendations.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchArticlesRecommendations.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.isLoading = false;
        recommendationsAdapter.setAll(state, action.payload);
      }
    );
    builder.addCase(fetchArticlesRecommendations.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  actions: articleDetailsRecommendationsAction,
  reducer: articleDetailsRecommendationsReducer,
} = ArticleDetailsRecommendstionsSlice;
