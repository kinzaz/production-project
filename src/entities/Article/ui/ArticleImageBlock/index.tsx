import { ArticleImageBlock as ArticleImageBlockType } from 'entities/Article/model/types/article';
import { FunctionComponent, memo } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextALign } from 'shared/ui/Text/Text';

interface ArticleImageBlockProps {
  className?: string;
  block: ArticleImageBlockType;
}

export const ArticleImageBlock: FunctionComponent<ArticleImageBlockProps> =
  memo(({ block, className }) => {
    return (
      <div className={classNames(styles.ArticleImageBlock, {}, [className])}>
        <img className={styles.img} src={block.src} alt={block.title} />
        {block.title && <Text text={block.title} align={TextALign.CENTER} />}
      </div>
    );
  });
