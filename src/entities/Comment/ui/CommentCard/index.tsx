import { Comment } from 'entities/Comment/model/types/comment';
import { FunctionComponent, memo } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar';
import { Text } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { VStack } from 'shared/ui/Stack/VStack';

interface CommentCardProps {
  comment: Comment;
  className?: string;
  isLoading?: boolean;
}

export const CommentCard: FunctionComponent<CommentCardProps> = memo(
  ({ comment, className, isLoading }) => {
    if (isLoading) {
      return (
        <div className={classNames(styles.CommentCard, {}, [className])}>
          <div className={styles.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton width={100} height={16} className={styles.username} />
          </div>
          <Skeleton className={styles.text} width={'100%'} height={50} />
        </div>
      );
    }

    return (
      <VStack
        gap="8"
        className={classNames(styles.CommentCard, {}, [className])}
      >
        <AppLink
          to={`${RoutePath.profile}${comment.user.id}`}
          className={styles.header}
        >
          {comment.user.avatar && (
            <Avatar src={comment.user.avatar} size={30} />
          )}
          <Text className={styles.username} title={comment.user.username} />
        </AppLink>
        <Text className={styles.text} text={comment.text} />
      </VStack>
    );
  }
);
