import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) =>
    state.articlesPage?.isLoading;

export const getArticlesPageError = (state: StateSchema) =>
    state.articlesPage?.error;

export const getArticlesPageView = (state: StateSchema) =>
    state.articlesPage?.view;

export const getArticlesPageNum = (state: StateSchema) =>
    state.articlesPage?.page || 1;

export const getArticlesPageHasMore = (state: StateSchema) =>
    state.articlesPage?.hasMore;

export const getArticlesPageLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 8;

export const getArticlesInited = (state: StateSchema) =>
    state.articlesPage?._inited;

export const getArticlesOrder = (state: StateSchema) =>
    state.articlesPage?.order || 'asc';

export const getArticlesSort = (state: StateSchema) =>
    state.articlesPage?.sort || ArticleSortField.CREATED;

export const getArticlesSearch = (state: StateSchema) =>
    state.articlesPage?.search ?? '';

export const getArticlesType = (state: StateSchema) =>
    state.articlesPage?.type ?? ArticleType.ALL;
