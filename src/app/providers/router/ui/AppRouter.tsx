import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/app/providers/router/config/routeConfig';
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';
import { PageLoader } from '@/widgets/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { AppRoutesProps } from '@/shared/types/router';

export const AppRouter = memo(() => {
  const auth = useSelector(getUserAuthData);

  const renderWithWrapper = useCallback(
    (route: AppRoutesProps) => {
      const element = (
        <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
      );
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.authOnly ? (
              <RequireAuth roles={route.roles} auth={Boolean(auth)}>
                {element}
              </RequireAuth>
            ) : (
              element
            )
          }
        />
      );
    },
    [auth]
  );

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
});
