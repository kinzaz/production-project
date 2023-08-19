import { FunctionComponent, memo, useCallback } from 'react';
import { Currency } from '../model/types/currency';
import { useTranslation } from 'react-i18next';
import { Listbox } from 'shared/ui/ListBox';
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
      <Listbox
        className={classNames('', {}, [className])}
        value={value}
        onChange={onChangeHandler}
        items={optionsList}
        defaultValue={t('Укажите валюту')}
        readonly={readonly}
        direction="top"
        label="Укажите валюту"
      />
    );
  }
);
