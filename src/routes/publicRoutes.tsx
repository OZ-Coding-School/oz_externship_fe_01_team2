import PublicRoute from '../routesGuard/PublicRoute';
import Login from '../pages/Login';

const publicRoutes = [
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
];

export default publicRoutes;
