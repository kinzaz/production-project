import {
    DetailedHTMLProps,
    FunctionComponent,
    HTMLAttributes,
    memo,
} from 'react';
import styles from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

type CardProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export const Card: FunctionComponent<CardProps> = memo(
    ({ children, className, ...props }) => {
        return (
            <div
                {...props}
                className={classNames(styles.Card, {}, [className])}
            >
                {children}
            </div>
        );
    },
);
