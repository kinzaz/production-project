import { Counter } from '@/entities/Counter';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider } from '@/shared/ui/Divider';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page data-testid="MainPage">
      {t('Главная страница')}
      <div>
        <Counter />
        <Divider margin={32} />
      </div>
    </Page>
  );
});

export default MainPage;
