import { classNames } from 'shared/lib/classNames/classNames';
import cls from './index.module.scss';
import { memo } from 'react';
import { Page } from 'widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;

  return (
    <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
      Admin Panel
    </Page>
  );
});

export default AdminPanelPage;
