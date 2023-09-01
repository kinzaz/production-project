import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
  const { className } = props;

  return (
    <Page className={classNames('', {}, [className])}>
      Admin Panel
    </Page>
  );
});

export default AdminPanelPage;
