import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text, TextSize, TextTheme } from './Text';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/consts/theme';

export default {
    title: 'shared/Text',
    component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title',
    text: 'text',
};

export const Title = Template.bind({});
Title.args = {
    title: 'Title',
};

export const TextMain = Template.bind({});
TextMain.args = {
    text: 'text',
};

export const Error = Template.bind({});
Error.args = {
    title: 'Title',
    text: 'text',
    theme: TextTheme.ERROR,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Title',
    text: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TitleDark = Template.bind({});
TitleDark.args = {
    title: 'Title',
};
TitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TextMainDark = Template.bind({});
TextMainDark.args = {
    text: 'text',
};
TextMainDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Title',
    text: 'text',
    size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Title',
    text: 'text',
    size: TextSize.M,
};
