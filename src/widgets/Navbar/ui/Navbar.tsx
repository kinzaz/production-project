import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation(['about', 'main']);
  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <div className={styles.links}>
   
      </div>
    </div>
  );
};
