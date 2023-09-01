import { Popover as HPopover } from '@headlessui/react';
import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { DropDownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/Consts';
import popupStyles from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import styles from './index.module.scss';

interface PopoverProps {
  className?: string;
  trigger?: ReactNode;
  direction?: DropDownDirection;
}

export const Popover: FunctionComponent<PropsWithChildren<PopoverProps>> = ({
  className,
  direction = 'bottom left',
  trigger,
  children,
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(styles.Popover, {}, [className])}>
      <HPopover.Button className={popupStyles.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel className={classNames(styles.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
};
