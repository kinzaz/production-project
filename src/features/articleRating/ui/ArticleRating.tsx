import { RatingCard } from '@/entities/Rating';
import { FunctionComponent, useCallback } from 'react';
import { useArticleRating, useRateArticle } from '../api/ArticleRatingApi';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ArticleRatingProps {
  articleId: string;
  className?: string;
}

const ArticleRating: FunctionComponent<ArticleRatingProps> = ({
  articleId,
  className,
}) => {
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useArticleRating({
    articleId,
    userId: userData?.id ?? '',
  });
  const [rateArticleMutation] = useRateArticle();

  const rating = data?.[0];

  const handleRateArticle = useCallback(
    (starCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? '',
          articleId,
          rate: starCount,
          feedback,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onCancel = useCallback(
    (starCount: number) => {
      handleRateArticle(starCount);
    },
    [handleRateArticle]
  );

  const onAccept = useCallback(
    (starCount: number, feedback?: string) => {
      handleRateArticle(starCount, feedback);
    },
    [handleRateArticle]
  );

  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />;
  }

  return (
    <RatingCard
      className={classNames('', {}, [className])}
      title="Оцените статью"
      feedbackTitle="Оставьте свой отзыв о статье"
      rate={rating?.rate}
      onAccept={onAccept}
      onCancel={onCancel}
      hasFeedback
    />
  );
};

export default ArticleRating;
