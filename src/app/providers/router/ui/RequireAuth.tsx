import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export function RequireAuth({
  children,
  auth,
}: {
  children: JSX.Element;
  auth: boolean;
}) {
  // @ts-ignore
  // const auth = useSelector((state) => state.user.authData);
  const location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  return children;
}
