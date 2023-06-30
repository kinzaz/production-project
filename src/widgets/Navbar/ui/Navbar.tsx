import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Navbar.module.scss';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { t } = useTranslation(['about', 'main']);
  return (
    <div className={classNames(styles.navbar, {}, [className])}>
      <Button
        onClick={onToggleModal}
        theme={ButtonTheme.CLEAR_INVERTED}
        className={styles.links}
      >
        {t('Войти')}
      </Button>
      <Modal isOpen={isOpen} onClose={onToggleModal}>
        {/* eslint-disable */}
        Modal
        {/* eslint-disable */}
      </Modal>
    </div>
  );
};
