import { ArticleTextBlock as ArticleTextBlockType } from '@/entities/Article/model/types/article';
import { FunctionComponent, memo } from 'react';
import { Text } from '@/shared/ui/Text/Text';
import styles from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleTextProps {
    block: ArticleTextBlockType;
    className?: string;
}

export const ArticleTextBlock: FunctionComponent<ArticleTextProps> = memo(
    ({ block, className }) => {
        return (
            <div
                className={classNames(styles.ArticleTextBlock, {}, [className])}
            >
                {block.title && (
                    <Text title={block.title} className={styles.title} />
                )}
                {block.paragraphs.map((p, i) => (
                    <Text key={i} text={p} className={styles.paragraph} />
                ))}
            </div>
        );
    },
);
