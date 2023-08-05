import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { FunctionComponent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../model/slices/ArticleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleDetailsCommentsIsLoading);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return <div>{t('Статья не найдена!')}</div>;
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(styles.ArticleDetailsPage, {}, [])}>
        <ArticleDetails id={id} />
        <Text className={styles.commentTitle} title={t('Комментарии')} />
        <CommentList isLoading={isLoading} comments={comments} />
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
