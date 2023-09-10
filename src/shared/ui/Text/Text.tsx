import { FunctionComponent, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextALign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextALign;
    size?: TextSize;
    'data-testid'?: string;
}

type THeaderTag = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, THeaderTag> = {
    [TextSize.L]: 'h1',
    [TextSize.M]: 'h2',
    [TextSize.S]: 'h3',
};

export const Text: FunctionComponent<TextProps> = memo(
    ({
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextALign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'text',
    }) => {
        const HeaderTag = mapSizeToHeaderTag[size];

        return (
            <div
                className={classNames(styles.Text, {}, [
                    className,
                    styles[theme],
                    styles[align],
                    styles[size],
                ])}
            >
                {title && (
                    <HeaderTag
                        data-testid={`${dataTestId}.Header`}
                        className={styles.title}
                    >
                        {title}
                    </HeaderTag>
                )}
                {text && (
                    <p
                        data-testid={`${dataTestId}.Paragraph`}
                        className={styles.text}
                    >
                        {text}
                    </p>
                )}
            </div>
        );
    },
);
