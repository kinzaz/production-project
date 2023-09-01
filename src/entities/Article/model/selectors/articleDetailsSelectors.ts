import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsData = (store: StateSchema) =>
  store.articleDetails?.data;

export const getArticleDetailsIsLoading = (store: StateSchema) =>
  store.articleDetails?.isLoading;
  
export const getArticleDetailsError = (store: StateSchema) =>
  store.articleDetails?.error;
