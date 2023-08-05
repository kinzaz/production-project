import { useAppDispatch } from 'app/providers/StoreProvider/hooks';
import { getAddCommentFormText } from 'features/addComment/modal/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from 'features/addComment/modal/slices/addCommentFormSlice';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './index.module.scss';

export interface AddCommentPageProps {
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FunctionComponent<AddCommentPageProps> = ({
  onSendComment,
}) => {
  const { t } = useTranslation('comments');
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onSendComment, onCommentTextChange, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={styles.AddCommentForm}>
        <Input
          className={styles.input}
          value={text}
          onChange={onCommentTextChange}
          placeholder={t('Введите текст комментария')}
        />
        <Button onClick={onSendHandler}>{t('Отправить')}</Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
