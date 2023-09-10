import { classNames } from '@/shared/lib/classNames/classNames';
import './Loader.scss';
import { memo } from 'react';

interface LoaderProps {
    className?: string;
}

export const Loader = memo(({ className }: LoaderProps) => {
    return (
        <div
            className={classNames('loadingio-spinner-eclipse-2xh8bf75jes', {}, [
                className,
            ])}
        >
            <div className="ldio-i1tj8ccdvsg">
                <div />
            </div>
        </div>
    );
});
