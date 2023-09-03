import { classNames } from '@/shared/lib/classNames/classNames';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarktIcon from '@/shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { memo } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/consts/theme';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('m', {}, [className])}
      onClick={toggleTheme}
    >
      {theme === Theme.DARK ? <DarktIcon /> : <LightIcon />}
    </Button>
  );
});
