export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticle = (id: string) => `/articles/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticlesNew = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFount = () => '*';

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'abouts',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE = 'article',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'not_found',
}
