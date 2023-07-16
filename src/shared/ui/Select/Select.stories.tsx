import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select } from './index';

export default {
  title: 'shared/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Select',
  options: [
    {
      value: '123',
      content: '123',
    },
    {
      value: '123',
      content: '123',
    },
    {
      value: '123',
      content: '123',
    },
  ],
};
