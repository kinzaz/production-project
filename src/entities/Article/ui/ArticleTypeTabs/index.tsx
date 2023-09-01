import { ArticleType } from '@/entities/Article/model/types/article';
import { FunctionComponent } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { Tab } from '@/shared/ui/Tabs/Tab';

interface ArticleTypeTabsProps {
  checkoutHandler: (type: ArticleType) => void;
  type: ArticleType;
}

export const ArticleTypeTabs: FunctionComponent<ArticleTypeTabsProps> = ({
  checkoutHandler,
  type,
}) => (
  <Tabs onChange={checkoutHandler} value={type}>
    <Tab value={ArticleType.ALL}>Все</Tab>
    <Tab value={ArticleType.IT}>Айти</Tab>
    <Tab value={ArticleType.POLICY}>Политика</Tab>
    <Tab value={ArticleType.SCIENCE}>Наука</Tab>
  </Tabs>
);
