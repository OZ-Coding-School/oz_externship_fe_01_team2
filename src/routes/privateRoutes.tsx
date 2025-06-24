import PrivateRoute from '../routesGuard/PrivateRoute';
import Dashboard from '../pages/Dashboard';

const privateRoutes = [
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
];

export default privateRoutes;
