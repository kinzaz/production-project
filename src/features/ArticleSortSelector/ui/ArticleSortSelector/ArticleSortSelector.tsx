import { ArticleSortField } from '@/entities/Article';
import { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/Select';
import styles from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector: FunctionComponent<ArticleSortSelectorProps> =
  ({ onChangeOrder, onChangeSort, order, sort, className }) => {
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
      () => [
        {
          value: 'asc',
          content: t('возрастанию'),
        },
        {
          value: 'desc',
          content: t('убыванию'),
        },
      ],
      [t]
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('дате создания'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('названию'),
        },
        {
          value: ArticleSortField.VIEW,
          content: t('просмотрам'),
        },
      ],
      [t]
    );

    return (
      <div className={classNames(styles.ArticleSortSelector, {}, [className])}>
        <Select<ArticleSortField>
          value={sort}
          onChange={onChangeSort}
          options={sortFieldOptions}
          label={t('Сортировать по')}
        />
        <Select<SortOrder>
          value={order}
          onChange={onChangeOrder}
          options={orderOptions}
          label={t('по')}
          className={styles.order}
        />
      </div>
    );
  };
