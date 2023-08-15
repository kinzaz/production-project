import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button/Button';
import styles from './index.module.scss';
import { useSelector } from 'react-redux';
import { getArticleDetailsData } from 'entities/Article';
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article';

export const ArticleDetailsPageHeader: FunctionComponent = () => {
  const { t } = useTranslation('article');
  const navigate = useNavigate();
  const article = useSelector(getArticleDetailsData);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditArticle = useCallback(() => {
    navigate(RoutePath.articles + '/' + article?.id + '/edit');
  }, [navigate, article?.id]);

  return (
    <div className={styles.ArticleDetailsPageHeader}>
      <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
      {canEdit && (
        <Button className={styles.editBtn} onClick={onEditArticle}>
          {t('Редактировать')}
        </Button>
      )}
    </div>
  );
};
