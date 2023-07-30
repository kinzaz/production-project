import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import {
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetailsSelectors';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { FunctionComponent, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Skeleton } from 'shared/ui/Skeleton';
import { Text, TextALign } from 'shared/ui/Text/Text';
import styles from './index.module.scss';

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
  id: string;
}

export const ArticleDetails: FunctionComponent<ArticleDetailsProps> = memo(
  ({ id }) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);
    // const article = useSelector(getArticleDetailsData);

    useEffect(() => {
      dispatch(fetchArticleById(id));
    }, [dispatch, id]);

    let content;

    if (isLoading) {
      content = (
        <div>
          <Skeleton
            className={styles.avatar}
            width={200}
            height={200}
            border="50%"
          />
          <Skeleton className={styles.title} width={300} height={32} />
          <Skeleton className={styles.skeleton} width={600} height={24} />
          <Skeleton className={styles.skeleton} width="100%" height={200} />
          <Skeleton className={styles.skeleton} width="100%" height={200} />
        </div>
      );
    } else if (error) {
      content = (
        <Text
          title={t('Произошла ошибка при загрузке статьи.')}
          align={TextALign.CENTER}
        />
      );
    } else {
      content = <></>;
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div>{content}</div>
      </DynamicModuleLoader>
    );
  }
);
