let profileId;

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      cy.visit(`/profile/${data.id}`);
      profileId = data.id;
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('Профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'admin');
  });
  it('Редактирование профиля', () => {
    const newName = 'new';
    const newLastname = 'lastname';
    cy.updateProfile(newName, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
});
