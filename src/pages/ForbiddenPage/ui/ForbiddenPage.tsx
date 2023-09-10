import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

export const ForbiddenPage: FunctionComponent = () => {
    const { t } = useTranslation();
    return <Page data-testid="ForbiddenPage">{t('Нет доступа')}</Page>;
};
