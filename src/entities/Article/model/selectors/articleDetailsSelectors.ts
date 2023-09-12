import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store/buildSelector';

export const [useArticleDetailsData, articleDetailsData] = buildSelector(
    (store: StateSchema) => store.articleDetails?.data,
);

export const [useArticleDetailsIsLoading, articleDetailsIsLoading] =
    buildSelector((store: StateSchema) => store.articleDetails?.isLoading);

export const [useArticleDetailsError, articleDetailsError] = buildSelector(
    (store: StateSchema) => store.articleDetails?.error,
);
