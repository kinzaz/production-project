import { Comment } from 'entities/Comment/model/types/comment';
import { FunctionComponent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList: FunctionComponent<CommentListProps> = memo(
  ({ comments, className }) => {
    const { t } = useTranslation('comments');

    return (
      <div className={classNames(styles.CommentList, {}, [className])}>
        {comments?.length ? (
          comments.map((comment) => (
            <CommentCard
              className={styles.comment}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={t('Комментарии отсутствуют')} />
        )}
      </div>
    );
  }
);
