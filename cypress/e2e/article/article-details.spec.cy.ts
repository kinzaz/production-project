let currentArticleId;

describe('Пользователь заходит на страницу статьи', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`/articles/${currentArticleId}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it('Загрузка содержимого статьи', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('Загрузка списка рекомендаций', () => {
    cy.getByTestId('ArticleRecommendationList').should('exist');
  });
  it('Оставление комментария', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('Оценивание статьи', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(3, 'feedback');
    cy.get('[data-selected="true"').should('have.length', 3);
  });
});
