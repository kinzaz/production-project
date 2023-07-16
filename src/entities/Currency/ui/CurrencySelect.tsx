import { FunctionComponent, memo, useCallback } from 'react';
import { Select } from 'shared/ui/Select';
import { Currency } from '../model/types/currency';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

const optionsList = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

interface CurrencySelectProps {
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
  className?: string;
}

export const CurrencySelect: FunctionComponent<CurrencySelectProps> = memo(
  ({ onChange, value, readonly = true, className }) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange && onChange(value as Currency);
      },
      [onChange]
    );

    return (
      <Select
        className={classNames('', {}, [className])}
        value={value}
        onChange={onChangeHandler}
        label={t('Укажите валюту')}
        options={optionsList}
        readonly={readonly}
      />
    );
  }
);
