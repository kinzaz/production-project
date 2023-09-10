import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './PageError.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const reloadPage = () => {
        navigate(0);
    };

    return (
        <div className={classNames(styles.PageError, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <button onClick={reloadPage}>{t('Перезагрузить')}</button>
        </div>
    );
};
