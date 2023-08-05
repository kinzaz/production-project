import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from './types';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/Article.svg';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      Icon: MainIcon,
      text: 'Главная',
    },
    {
      path: RoutePath.abouts,
      Icon: AboutIcon,
      text: 'О сайте',
    },
  ];
  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData?.id,
        Icon: ProfileIcon,
        text: 'Профиль',
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        text: 'Статьи',
        authOnly: true,
      }
    );
  }
  return sidebarItemsList;
});
