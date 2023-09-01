import { rtkApi } from '@/shared/api/rtkApi';
import { Notifications } from '../model/types';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getnotificationsList: build.query<Notifications[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
});

export const useNotificationsList =
  notificationApi.useGetnotificationsListQuery;
