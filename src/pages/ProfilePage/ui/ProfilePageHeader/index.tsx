import { FunctionComponent, useCallback } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getProfileReadonly,
  profileActions,
  updateProfileData,
} from 'entities/Profile';
import { useAppDispatch } from 'app/providers/StoreProvider/hooks';

export const ProfilePageHeader: FunctionComponent = () => {
  const { t } = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = () => {
    dispatch(updateProfileData());
  };

  return (
    <div className={styles.ProfilePageHeader}>
      <Text title={t('Профиль')} />
      {readonly ? (
        <Button theme={ButtonTheme.OUTLINE} onClick={onEdit}>
          {t('Редактировать')}
        </Button>
      ) : (
        <div className={styles.editBtns}>
          <Button
            className={styles.saveBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onSave}
          >
            {t('Сохранить')}
          </Button>
          <Button
            className={styles.editBtn}
            theme={ButtonTheme.OUTLINE_RED}
            onClick={onCancelEdit}
          >
            {t('Отменить')}
          </Button>
        </div>
      )}
    </div>
  );
};
