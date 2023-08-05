import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import AvatarImg from 'shared/assets/tests/Avatar-storybook.jpg';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    id: '1',
    username: 'vlad',
    lastname: 'Vlasenko',
    first: 'Vlad',
    age: '25',
    avatar: AvatarImg,
    city: 'Gukovo',
    currency: Currency.EUR,
    country: Country.Russia,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
