import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '@/entities/Article/model/selectors/articleDetailsSelectors';
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById';
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text, TextALign, TextSize } from '@/shared/ui/Text/Text';
import styles from './index.module.scss';
import { Avatar } from '@/shared/ui/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/Icon';
import {
    ArticleBlock,
    ArticleBlockType,
} from '@/entities/Article/model/types/article';
import { ArticleCodeBlock } from '../ArticleCodeBlock';
import { ArticleImageBlock } from '../ArticleImageBlock';
import { ArticleTextBlock } from '../ArticleTextBlock';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { HStack } from '@/shared/ui/Stack/HStack';
import { VStack } from '@/shared/ui/Stack/VStack';

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

interface ArticleDetailsProps {
    id: string;
}

export const ArticleDetails: FunctionComponent<ArticleDetailsProps> = memo(
    ({ id }) => {
        const { t } = useTranslation('article');
        const dispatch = useAppDispatch();
        const isLoading = useArticleDetailsIsLoading();
        const error = useArticleDetailsError();
        const article = useArticleDetailsData();

        const renderBlock = useCallback((block: ArticleBlock, i: number) => {
            switch (block.type) {
                case ArticleBlockType.CODE:
                    return (
                        <ArticleCodeBlock
                            key={i}
                            block={block}
                            className={styles.block}
                        />
                    );
                case ArticleBlockType.IMAGE:
                    return (
                        <ArticleImageBlock
                            key={i}
                            block={block}
                            className={styles.block}
                        />
                    );
                case ArticleBlockType.TEXT:
                    return (
                        <ArticleTextBlock
                            key={i}
                            block={block}
                            className={styles.block}
                        />
                    );
                default:
                    return null;
            }
        }, []);

        useInitialEffect(() => {
            dispatch(fetchArticleById(id));
        });

        let content;

        if (isLoading) {
            content = (
                <>
                    <Skeleton
                        className={styles.avatar}
                        width={200}
                        height={200}
                        border="50%"
                    />
                    <Skeleton
                        className={styles.title}
                        width={300}
                        height={32}
                    />
                    <Skeleton
                        className={styles.skeleton}
                        width={600}
                        height={24}
                    />
                    <Skeleton
                        className={styles.skeleton}
                        width="100%"
                        height={200}
                    />
                    <Skeleton
                        className={styles.skeleton}
                        width="100%"
                        height={200}
                    />
                </>
            );
        } else if (error) {
            content = (
                <Text
                    title={t('Произошла ошибка при загрузке статьи.')}
                    align={TextALign.CENTER}
                />
            );
        } else {
            content = (
                <>
                    <HStack justify="center" className={styles.avatarWrapper}>
                        <Avatar size={200} src={article?.img} />
                    </HStack>
                    <VStack gap="4" data-testid="ArticleDetails.Info">
                        <Text
                            className={styles.title}
                            title={article?.title}
                            text={article?.subtitle}
                            size={TextSize.L}
                        />
                        <HStack gap="8">
                            <Icon className={styles.icon} Svg={EyeIcon} />
                            <Text text={`${article?.views}`} />
                        </HStack>
                        <HStack gap="8">
                            <Icon className={styles.icon} Svg={CalendarIcon} />
                            <Text text={article?.createdAt} />
                        </HStack>
                    </VStack>
                    {article?.blocks.map(renderBlock)}
                </>
            );
        }

        return (
            <DynamicModuleLoader reducers={reducers}>
                <VStack gap="16">{content}</VStack>
            </DynamicModuleLoader>
        );
    },
);
