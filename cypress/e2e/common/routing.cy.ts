import { selectByTestId } from '../../helpers/selectByTestId';

describe('template spec', () => {
  describe('Пользователь не авторизован', () => {
    it('Пользователь открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('MainPage')).should('exist');
    });
    it('Пользователь открывает несуществующий маршрут', () => {
      cy.visit('/profiles/1');
      cy.get(selectByTestId('NotFoundPage')).should('exist');
    });
  });
  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login('testuser', '123');
    });

    it('Пользователь открывает страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(selectByTestId('ProfilePage')).should('exist');
    });

    it('Пользователь открывает страницу списка статей', () => {
      cy.visit('/articles');
      cy.get(selectByTestId('ArticlesPage')).should('exist');
    });
  });
});
