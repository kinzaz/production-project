import { Comment } from '@/entities/Comment/model/types/comment';
import { FunctionComponent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { CommentCard } from './CommentCard';
import { VStack } from '@/shared/ui/Stack/VStack';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList: FunctionComponent<CommentListProps> = memo(
    ({ comments, className, isLoading }) => {
        const { t } = useTranslation('comments');

        return (
            <VStack gap="16" className={classNames('', {}, [className])}>
                {comments?.length ? (
                    comments.map((comment) => (
                        <CommentCard
                            comment={comment}
                            key={comment.id}
                            isLoading={isLoading}
                        />
                    ))
                ) : (
                    <Text text={t('Комментарии отсутствуют')} />
                )}
            </VStack>
        );
    },
);
