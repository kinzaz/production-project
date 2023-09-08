import { Article } from '../../../src/entities/Article';
import { defaultArticle } from './consts';

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/articles',
      headers: { authorization: 'qwda' },
      body: article ?? defaultArticle,
    })
    .then((data) => data.body);
};

export const removeArticle = (articleId: string) => {
  return cy.request({
    method: 'DELETE',
    url: 'http://localhost:8000/articles/' + articleId,
    headers: { authorization: 'qwda' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(articleId: string): Chainable<void>;
    }
  }
}
