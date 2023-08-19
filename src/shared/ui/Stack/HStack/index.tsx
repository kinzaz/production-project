import { FunctionComponent, PropsWithChildren } from 'react';
import { Flex, FlexProps } from '../Flex';

type HStackProps = Omit<FlexProps, 'direction'>;

export const HStack: FunctionComponent<PropsWithChildren<HStackProps>> = (
  props
) => {
  const { align = 'start' } = props;
  return (
    <Flex {...props} direction="row" align={align}>
      {props.children}
    </Flex>
  );
};
