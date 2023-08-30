import { useNotificationsList } from 'entities/Notifications/api/NotificationsApi';
import { FunctionComponent } from 'react';
import { VStack } from 'shared/ui/Stack/VStack';
import { NotificationItem } from '../NotificationItem';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton';

export const NotificationList: FunctionComponent<{ className?: string }> = ({
  className,
}) => {
  const { data, isLoading } = useNotificationsList(null, {
    pollingInterval: 5000,
  });

  if (isLoading) {
    return (
      <VStack className={classNames(styles.NotificationList, {}, [className])}>
        <Skeleton width="300px" border="8px" height="80px" />
        <Skeleton width="300px" border="8px" height="80px" />
        <Skeleton width="300px" border="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="8"
      className={classNames(styles.NotificationList, {}, [className])}
    >
      {data?.map((item, i) => (
        <NotificationItem key={i} item={item} />
      ))}
    </VStack>
  );
};
