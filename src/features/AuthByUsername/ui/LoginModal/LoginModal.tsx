import { FunctionComponent } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
import { classNames } from 'shared/lib/classNames/classNames';

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose(): void;
}

export const LoginModal: FunctionComponent<LoginModalProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  return (
    <Modal
      className={classNames(undefined, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};