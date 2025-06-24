import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../pages/Home';
import NotFoundPage from '../pages/NotFoundPage';
import publicRoutes from './PublicRoutes';
import privateRoutes from './PrivateRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
