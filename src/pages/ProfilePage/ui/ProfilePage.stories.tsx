import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import AvatarImg from 'shared/assets/tests/Avatar-storybook.jpg';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: {
        age: '25',
        avatar: AvatarImg,
        city: 'Gukovo',
        country: Country.Russia,
        currency: Currency.USD,
        first: 'Vlad',
        lastname: 'Vlasenko',
        username: 'Vlad',
      },
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: {
        age: '25',
        avatar: AvatarImg,
        city: 'Gukovo',
        country: Country.Russia,
        currency: Currency.USD,
        first: 'Vlad',
        lastname: 'Vlasenko',
        username: 'Vlad',
      },
    },
  }),
];
