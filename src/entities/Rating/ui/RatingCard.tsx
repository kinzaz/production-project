import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack } from '@/shared/ui/Stack/HStack';
import { VStack } from '@/shared/ui/Stack/VStack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text, TextALign } from '@/shared/ui/Text/Text';
import { FunctionComponent, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

interface RatingCardProps {
  title?: string;
  className?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starCount: number) => void;
  onAccept?: (starCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard: FunctionComponent<RatingCardProps> = ({
  className,
  feedbackTitle,
  hasFeedback,
  onAccept,
  onCancel,
  title,
  rate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate || 0);
  const [feedback, setFeedback] = useState('');

  const onSelectedStars = useCallback(
    (selectedStarsCount: number) => {
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
      setStarsCount(selectedStarsCount);
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const modalContent = (
    <>
      <Text title={feedbackTitle} align={TextALign.CENTER} />
      <Input
        data-testid="RatingCard.Input"
        value={feedback}
        onChange={setFeedback}
        placeholder="Ваш отзыв"
      />
    </>
  );

  return (
    <Card data-testid="RatingCard" className={classNames('', {}, [className])}>
      <VStack align="center" gap="8">
        <Text
          title={starsCount ? 'Спасибо за оценку' : title}
          align={TextALign.CENTER}
        />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectedStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap="32">
            {modalContent}
            <HStack gap="16" justify="end">
              <Button
                data-testid={'RatingCard.Close'}
                onClick={cancelHandle}
                theme={ButtonTheme.OUTLINE_RED}
              >
                Закрыть
              </Button>
              <Button data-testid={'RatingCard.Send'} onClick={acceptHandle}>
                Отправить
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} onClose={cancelHandle}>
          <VStack gap="32">
            {modalContent}
            <Button onClick={acceptHandle} fullWidth size={ButtonSize.L}>
              Отправить
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </Card>
  );
};
