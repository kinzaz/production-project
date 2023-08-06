import { Counter } from 'entities/Counter';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page';

const MainPage = memo(() => {
  const { t } = useTranslation();

  return (
    <Page>
      {t('Главная страница')}
      <div>
        <Counter />
      </div>
    </Page>
  );
});

export default MainPage;
