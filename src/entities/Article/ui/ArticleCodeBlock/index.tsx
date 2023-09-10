import { ArticleCodeBlock as ArticleCodeBlockType } from '@/entities/Article/model/types/article';
import { FunctionComponent, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';

interface ArticleCodeBlockProps {
    className: string;
    block: ArticleCodeBlockType;
}

export const ArticleCodeBlock: FunctionComponent<ArticleCodeBlockProps> = memo(
    ({ block, className }) => {
        return (
            <div className={classNames('', {}, [className])}>
                <Code text={block.code} />
            </div>
        );
    },
);
