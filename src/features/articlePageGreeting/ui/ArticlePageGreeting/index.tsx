import { memo, useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Text } from '@/shared/ui/Text/Text';
import { useJsonSetting } from '@/entities/User/model/selectors/jsonSettings';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/Drawer';

export const ArticlePageGreeting = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlePageWasOpened } = useJsonSetting();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlePageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
        }
    }, [dispatch, isArticlePageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title="Добро пожаловать на страницу статей"
            text="Здесь вы можете искать и просматривать статьи на различные темы"
        />
    );

    if (isMobile) {
        return (
            <Drawer isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});
