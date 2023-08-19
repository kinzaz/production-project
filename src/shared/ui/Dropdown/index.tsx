import { Menu } from '@headlessui/react';
import { Fragment, FunctionComponent, ReactNode } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from '../AppLink/AppLink';

export interface DropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClicK?: () => void;
  href?: string;
}

interface DropDownProps {
  className?: string;
  items: DropdownItem[];
  trigger?: ReactNode;
  direction?: DropDownDirection;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': styles.menuBottomLeft,
  'bottom right': styles.menuBottomRight,
  'top left': styles.menuTopLeft,
  'top right': styles.menuTopRight,
};

export const Dropdown: FunctionComponent<DropDownProps> = ({
  className,
  items,
  trigger,
  direction = 'bottom left',
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu as={'div'} className={classNames(styles.Dropdown, {}, [className])}>
      <Menu.Button className={styles.btn}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(styles.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              onClick={item.onClicK}
              className={classNames(
                styles.item,
                { [styles.active]: active },
                []
              )}
            >
              {item.content}
            </button>
          );
          if (item.href) {
            return (
              <Menu.Item
                disabled={item.disabled}
                key={item.href}
                as={AppLink}
                to={item.href}
              >
                {content}
              </Menu.Item>
            );
          }
          return (
            <Menu.Item disabled={item.disabled} key={item.href} as={Fragment}>
              {content}
            </Menu.Item>
          );
        })}
      </Menu.Items>
    </Menu>
  );
};
