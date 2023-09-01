import { getUserRoles } from '@/entities/User';
import { UserRole } from '@/entities/User/model/types/user';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
  auth: boolean;
  roles?: UserRole[];
}

export function RequireAuth({ children, auth, roles }: RequireAuthProps) {
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRequiredRoles = useMemo(() => {
    if (!roles) return true;
    return roles.some((requiredRoles) => {
      return userRoles?.includes(requiredRoles);
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />
    );
  }

  return children;
}
