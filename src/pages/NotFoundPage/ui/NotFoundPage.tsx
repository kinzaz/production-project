import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <Page
            data-testid="NotFoundPage"
            className={classNames(styles.NotFound, {}, [className])}
        >
            {t('Страница не найдена')}
        </Page>
    );
});
