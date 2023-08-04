import { FunctionComponent, useCallback } from 'react';
import styles from './index.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import IconCopy from 'shared/assets/icons/copy.svg';

interface CodeProps {
  text: string;
  className?: string;
}

export const Code: FunctionComponent<CodeProps> = ({ className, text }) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(styles.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={styles.copyBtn}
        theme={ButtonTheme.CLEAR}
      >
        <IconCopy className={styles.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
};
