import {
  Article,
  ArticleBlockType,
  ArticleTextBlock as ArticleTextBlockType,
  ArticleView,
} from 'entities/Article/model/types/article';
import {
  FunctionComponent,
  HTMLAttributeAnchorTarget,
} from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card';
import { Avatar } from 'shared/ui/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { ArticleTextBlock } from '../ArticleTextBlock';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';

interface ArticleListItemProps {
  article: Article;
  view: ArticleView;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem: FunctionComponent<ArticleListItemProps> = ({
  article,
  view,
  className,
  target,
}) => {
  const { t } = useTranslation('article');

  const types = (
    <Text text={article.type.join(', ')} className={styles.types} />
  );
  const views = (
    <>
      <Text text={String(article.views)} className={styles.views} />{' '}
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlockType;

    return (
      <div
        className={classNames(styles.ArticleListItem, {}, [
          className,
          styles[view],
        ])}
      >
        <Card>
          <div className={styles.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={styles.username} />
            <Text text={article.createdAt} className={styles.date} />
          </div>
          <Text text={article.title} className={styles.title} />
          {types}
          <img src={article.img} className={styles.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlock block={textBlock} className={styles.textBlock} />
          )}
          <div className={styles.footer}>
            <AppLink to={RoutePath.article + article.id} target={target}>
              <Button>{t('Читать далее')}</Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article + article.id}
      className={classNames(styles.ArticleListItem, {}, [
        className,
        styles[view],
      ])}
    >
      <Card>
        <div className={styles.imageWrapper}>
          <img src={article.img} alt={article.title} className={styles.img} />
          <Text text={article.createdAt} className={styles.date} />
        </div>
        <div className={styles.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={styles.title} />
      </Card>
    </AppLink>
  );
};
