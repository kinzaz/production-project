import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack/HStack';
import { getProfileData } from '@/features/editableProfileCard/model/selectors/getProfileData';
import { getProfileReadonly } from '@/features/editableProfileCard/model/selectors/getProfileReadonly';
import { updateProfileData } from '@/features/editableProfileCard/model/services/updateProfileData';
import { profileActions } from '@/features/editableProfileCard/model/slice/ProfileSlice';

export const ProfilePageHeader: FunctionComponent = () => {
  const { t } = useTranslation('profile');
  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const profileData = useSelector(getProfileData);
  const canEdit = authData?.id === profileData?.id;

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = () => {
    dispatch(updateProfileData(profileData?.id || ''));
  };

  return (
    <HStack justify="between">
      <Text title={t('Профиль')} />
      {canEdit && (
        <>
          {readonly ? (
            <Button
              data-testid={'ProfilePageHeader.EditButton'}
              theme={ButtonTheme.OUTLINE}
              onClick={onEdit}
            >
              {t('Редактировать')}
            </Button>
          ) : (
            <HStack gap="8">
              <Button
                data-testid={'ProfilePageHeader.SaveButton'}
                theme={ButtonTheme.OUTLINE}
                onClick={onSave}
              >
                {t('Сохранить')}
              </Button>
              <Button
                data-testid={'ProfilePageHeader.CancelButton'}
                theme={ButtonTheme.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t('Отменить')}
              </Button>
            </HStack>
          )}
        </>
      )}
    </HStack>
  );
};
