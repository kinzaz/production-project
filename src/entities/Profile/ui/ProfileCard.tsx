import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getProfileData } from '../model/selectors/getProfileData';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './ProfileCard.module.scss';
import { Input } from 'shared/ui/Input/Input';

export const ProfileCard: FunctionComponent = () => {
  const { t } = useTranslation('profile');
  const data = useSelector(getProfileData);

  return (
    <div className={styles.ProfileCard}>
      <div className={styles.header}>
        <Text title={t('Профиль')} />
        <Button className={styles.editBtn} theme={ButtonTheme.OUTLINE}>
          {t('Редактировать')}
        </Button>
      </div>
      <div className={styles.data}>
        <Input
          className={styles.input}
          value={data?.first}
          placeholder={t('Ваше имя')}
        />
        <Input
          className={styles.input}
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
        />
      </div>
    </div>
  );
};
