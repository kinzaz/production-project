describe('Пользователь заходит на страницу списка статей', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/articles');
  });
  it('Статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
