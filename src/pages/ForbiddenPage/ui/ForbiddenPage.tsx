import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

export const ForbiddenPage: FunctionComponent = () => {
  const { t } = useTranslation();
  return <Page>{t('Нет доступа')}</Page>;
};
