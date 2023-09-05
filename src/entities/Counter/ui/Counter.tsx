import { Button } from '@/shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const { t } = useTranslation();
  const { decrement, increment } = useCounterActions();
  const counterValue = useCounterValue();

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button onClick={() => increment()} data-testid="increment-btn">
        {t('increment')}
      </Button>
      <Button data-testid="decrement-btn" onClick={() => decrement()}>
        {t('decrement')}
      </Button>
    </div>
  );
};
