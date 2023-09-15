import { ArticleDetails } from '@/entities/Article';
import { FunctionComponent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './ArticleDetailsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../model/slices';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { VStack } from '@/shared/ui/Stack/VStack';
import { ArticleRecomendationsList } from '@/features/articleRecomendationsList';
import { ArticleDetailsComments } from './ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/feature';
import { Card } from '@/shared/ui/Card';

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('article');

    if (!id) {
        return <Page>{t('Статья не найдена!')}</Page>;
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                data-testid="ArticleDetailsPage"
                className={classNames(styles.ArticleDetailsPage, {}, [])}
            >
                <VStack gap="16">
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={<Card>Оценка статей скоро появится</Card>}
                    />
                    <ArticleRecomendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
