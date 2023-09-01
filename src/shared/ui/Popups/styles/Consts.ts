import { DropDownDirection } from '@/shared/types/ui';
import styles from './popup.module.scss';

export const mapDirectionClass: Record<DropDownDirection, string> = {
  'bottom left': styles.menuBottomLeft,
  'bottom right': styles.menuBottomRight,
  'top left': styles.menuTopLeft,
  'top right': styles.menuTopRight,
};
