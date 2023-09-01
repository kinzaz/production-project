import { ArticleView } from '@/entities/Article';
import { FunctionComponent } from 'react';
import BigIcon from '@/shared/assets/icons/articles-list.svg';
import SmallIcon from '@/shared/assets/icons/articles-one.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon';
import styles from './index.module.scss';

interface ArticleViewSwitcherProps {
  view?: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
  { view: ArticleView.SMALL, icon: SmallIcon },
  { view: ArticleView.BIG, icon: BigIcon },
];

export const ArticleViewSwitcher: FunctionComponent<ArticleViewSwitcherProps> =
  ({ view, onViewClick }) => {
    const onClick = (newView: ArticleView) => () => onViewClick?.(newView);

    return (
      <div>
        {viewTypes.map((viewType) => (
          <Button
            onClick={onClick(viewType.view)}
            theme={ButtonTheme.CLEAR}
            key={viewType.view}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames(
                '',
                { [styles.selected]: viewType.view === view },
                []
              )}
            />
          </Button>
        ))}
      </div>
    );
  };
