import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addComment';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import styles from '../ArticleDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { getArticleComments } from '@/pages/ArticleDetailsPage/model/slices/ArticleDetailsCommentsSlice';
import { getArticleDetailsCommentsIsLoading } from '@/pages/ArticleDetailsPage/model/selectors/comments';
import { addCommentForArticle } from '@/pages/ArticleDetailsPage/model/services/addCommentForArticle';
import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { fetchCommentsByArticleId } from '@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId';

export const ArticleDetailsComments: FunctionComponent<{ id: string }> = ({
  id,
}) => {
  const { t } = useTranslation('article');
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );
  return (
    <div>
      <Text
        size={TextSize.L}
        className={styles.commentTitle}
        title={t('Комментарии')}
      />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={isLoading} comments={comments} />
    </div>
  );
};
