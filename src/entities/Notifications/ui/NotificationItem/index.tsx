import { Notifications } from 'entities/Notifications/model/types';
import { FunctionComponent } from 'react';
import { Card } from 'shared/ui/Card';
import { Text } from 'shared/ui/Text/Text';
import styles from './index.module.scss';

interface NotificationItemProps {
  item: Notifications;
}

export const NotificationItem: FunctionComponent<NotificationItemProps> = ({
  item,
}) => {
  const content = (
    <Card>
      <Text title={item.title} text={item.description} />
    </Card>
  );

  if (item.href) {
    return (
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href={item.href}
      >
        {content}
      </a>
    );
  }

  return content;
};
