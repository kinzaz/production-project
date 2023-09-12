import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useArticleDetailsData } from '@/entities/Article';
import { getCanEditArticle } from '@/pages/ArticleDetailsPage/model/selectors/article';
import { HStack } from '@/shared/ui/Stack/HStack';
import { getRouteArticleEdit, getRouteArticles } from '@/shared/consts/router';

export const ArticleDetailsPageHeader: FunctionComponent = () => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();
    const article = useArticleDetailsData();
    const canEdit = useSelector(getCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles());
    }, [navigate]);

    const onEditArticle = useCallback(() => {
        navigate(getRouteArticleEdit(article?.id || ''));
    }, [navigate, article?.id]);

    return (
        <HStack justify="between">
            <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
            {canEdit && (
                <Button onClick={onEditArticle}>{t('Редактировать')}</Button>
            )}
        </HStack>
    );
};
