import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleDetailsRecommendationIsLoading = (state: StateSchema) =>
    state.articleDetailsPage?.recommendation?.isLoading;

export const getArticleDetailsRecommendationError = (state: StateSchema) =>
    state.articleDetailsPage?.recommendation.error;
