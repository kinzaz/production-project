import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentsSchema';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId';

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.articleDetailsComments || commentsAdapter.getInitialState()
);

const ArticleDetailsCommentsSlice = createSlice({
  name: 'ArticleDetailsCommentsSlice',
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
    isLoading: false,
    error: '',
    ids: [],
    entities: {},
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.error = undefined;
      state.isLoading = true;
    });
    builder.addCase(
      fetchCommentsByArticleId.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        state.isLoading = false;
        commentsAdapter.setAll(state, action.payload);
      }
    );
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const {
  actions: articleDetailsCommentsAction,
  reducer: articleDetailsCommentsReducer,
} = ArticleDetailsCommentsSlice;
