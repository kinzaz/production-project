import { Theme } from '@/shared/consts/theme';

export interface JsonSettings {
    theme?: Theme;
    isFirstVisit?: boolean;
    settingsPageHasBeenOpen?: boolean;
}
