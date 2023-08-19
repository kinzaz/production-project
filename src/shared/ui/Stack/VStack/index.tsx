import { FunctionComponent, PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const VStack: FunctionComponent<PropsWithChildren<HStackProps>> = (
  props
) => {
  const { align = 'start' } = props;
  return (
    <Flex {...props} direction="column" align={align}>
      {props.children}
    </Flex>
  );
};
