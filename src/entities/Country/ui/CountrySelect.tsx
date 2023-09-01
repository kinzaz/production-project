import { FunctionComponent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Country } from '../model/Country';
import { Listbox } from '@/shared/ui/Popups';

const optionsList = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.Armenia, content: Country.Armenia },
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
];

interface CountrySelectProps {
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
  className?: string;
}

export const CountrySelect: FunctionComponent<CountrySelectProps> = memo(
  ({ onChange, value, readonly = true, className }) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange && onChange(value as Country);
      },
      [onChange]
    );

    return (
      <Listbox
        className={classNames('', {}, [className])}
        value={value}
        onChange={onChangeHandler}
        items={optionsList}
        defaultValue={t('Укажите страну')}
        readonly={readonly}
        direction="top right"
        label="Укажите страну"
      />
    );
  }
);
