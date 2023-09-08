import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/app/providers/StoreProvider/hooks';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { ValidateProfileError } from '@/features/editableProfileCard/model/types/editableProfileCardSchema';
import { ProfileCard } from '@/entities/Profile';
import { getProfileError } from '@/features/editableProfileCard/model/selectors/getProfileError';
import { getProfileForm } from '@/features/editableProfileCard/model/selectors/getProfileForm';
import { getProfileIsLoading } from '@/features/editableProfileCard/model/selectors/getProfileIsLoading';
import { getProfileReadonly } from '@/features/editableProfileCard/model/selectors/getProfileReadonly';
import { getProfileValidateErrors } from '@/features/editableProfileCard/model/selectors/getProfileValidateErrors';
import { fetchProfileData } from '@/features/editableProfileCard/model/services/fetchProfileData';
import { profileActions } from '@/features/editableProfileCard/model/slice/ProfileSlice';
import { ProfilePageHeader } from '../EditableProfileHeader';

interface EditableProfileCardProps {
  className?: string;
  id: string;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
  const { className, id } = props;
  const dispatch = useAppDispatch();
  const form = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const { t } = useTranslation('profile');

  const validateErrors = useSelector(getProfileValidateErrors);
  const validateErrorTranslates = {
    [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
    [ValidateProfileError.INCORRECT_NO_DATA]: t('Отсутствуют данные'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректные данные юзера'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value }));
    },
    [dispatch]
  );

  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value }));
    },
    [dispatch]
  );

  const onChangeAge = useCallback(
    (value?: string) => {
      dispatch(
        profileActions.updateProfile({
          age: value?.replace(/[\D]/gi, ''),
        })
      );
    },
    [dispatch]
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value }));
    },
    [dispatch]
  );

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value }));
    },
    [dispatch]
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value }));
    },
    [dispatch]
  );

  const onChangeCurrency = useCallback(
    (value?: Currency) => {
      dispatch(profileActions.updateProfile({ currency: value }));
    },
    [dispatch]
  );

  const onChangeCountry = useCallback(
    (value?: Country) => {
      dispatch(profileActions.updateProfile({ country: value }));
    },
    [dispatch]
  );

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader />
      {validateErrors?.length &&
        validateErrors.map((err, index: number) => (
          <Text
            theme={TextTheme.ERROR}
            title={validateErrorTranslates[err]}
            key={index}
            data-testid={'EditableProfileCard.Error'}
          />
        ))}
      <ProfileCard
        data={form}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
        onChangeFirstname={onChangeFirstname}
        onChangeLastname={onChangeLastname}
        onChangeAge={onChangeAge}
        onChangeCity={onChangeCity}
        onChangeAvatar={onChangeAvatar}
        onChangeUsername={onChangeUsername}
        onChangeCurrency={onChangeCurrency}
        onChangeCountry={onChangeCountry}
      />
    </div>
  );
});
