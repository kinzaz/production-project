import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import styles from './ArticleDetailsPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getArticleComments } from '../model/slices/ArticleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId';
import { AddCommentForm } from 'features/addComment';
import { addCommentForArticle } from '../model/services/addCommentForArticle';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page';
import { getArticleRecommendations } from '../model/slices/ArticleDetailsRecommendationsSlice';
import { getArticleDetailsRecommendationIsLoading } from '../model/selectors/recommendation';
import { ArticleList } from 'entities/Article/ui/ArticleList';
import { fetchArticlesRecommendations } from '../model/services/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../model/slices';

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article');
  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
  const isLoadingRecommendation = useSelector(
    getArticleDetailsRecommendationIsLoading
  );
  const navigate = useNavigate();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticlesRecommendations());
  });

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (!id) {
    return <Page>{t('Статья не найдена!')}</Page>;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(styles.ArticleDetailsPage, {}, [])}>
        <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
        <ArticleDetails id={id} />

        <Text
          size={TextSize.L}
          className={styles.commentTitle}
          title={t('Рекомендуем')}
        />
        <ArticleList
          isLoading={isLoadingRecommendation}
          articles={recommendations}
          className={styles.recommendation}
          target="_blank"
        />
        <Text
          size={TextSize.L}
          className={styles.commentTitle}
          title={t('Комментарии')}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={isLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDetailsPage);
