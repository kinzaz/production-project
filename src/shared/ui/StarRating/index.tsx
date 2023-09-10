import { FunctionComponent, useState } from 'react';
import { Icon } from '../Icon';
import StarIcon from '@/shared/assets/icons/Star.svg';
import styles from './index.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface StarRatingProps {
    className?: string;
    onSelect?: (star: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FunctionComponent<StarRatingProps> = ({
    className,
    onSelect,
    selectedStars,
    size,
}) => {
    const [currentStarCount, setCurrentStarCount] = useState(
        selectedStars || 0,
    );
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starCount: number) => () => {
        if (!isSelected) {
            setCurrentStarCount(starCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarCount(0);
        }
    };

    const onClickStars = (starCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starCount);
            setCurrentStarCount(starCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={styles.Stars}>
            {stars.map((star) => (
                <Icon
                    className={classNames(
                        styles.starIcon,
                        {
                            [styles.hovered]: currentStarCount >= star,
                            [styles.isSelected]: isSelected,
                        },
                        [className],
                    )}
                    Svg={StarIcon}
                    key={star}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(star)}
                    onClick={onClickStars(star)}
                    data-testid={'StarRating.' + star}
                    data-selected={currentStarCount >= star}
                />
            ))}
        </div>
    );
};
