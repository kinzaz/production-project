import { EditableProfileCard } from './index';
import { componentRender } from 'shared/config/tests/componentRender/componentRender';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { profileReducer } from 'features/editableProfileCard/model/slice/ProfileSlice';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';

const profile = {
  age: '25',
  avatar: '',
  city: 'Gukovo',
  country: Country.Russia,
  currency: Currency.USD,
  first: 'Vlad',
  lastname: 'Vlasenko',
  username: 'Vlad',
};
const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Редактирование профиля', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfilePageHeader.EditButton'));
    expect(
      screen.getByTestId('ProfilePageHeader.CancelButton')
    ).toBeInTheDocument();
  });

  test('При отмене значения обнуляются', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfilePageHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.click(screen.getByTestId('ProfilePageHeader.CancelButton'));
    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue();
  });

  test('При сохранении значения обнуляются', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfilePageHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    await userEvent.click(screen.getByTestId('ProfilePageHeader.CancelButton'));
    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Vlad');
  });

  test('Должна появляться ошибка', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('ProfilePageHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.click(screen.getByTestId('ProfilePageHeader.SaveButton'));
    expect(
      screen.getByTestId('EditableProfileCard.Error.Header')
    ).toBeInTheDocument();
  });

  test('Запрос сохранить', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    const mockPutReq = jest.spyOn($api, 'put');
    await userEvent.click(screen.getByTestId('ProfilePageHeader.EditButton'));
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.click(screen.getByTestId('ProfilePageHeader.SaveButton'));
    expect(mockPutReq).toHaveBeenCalled();
  });
});
