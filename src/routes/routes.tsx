import AppLayout from '../layouts/default/app-layout';
import { Outlet, Navigate, type RouteObject } from 'react-router';
import UsersListScreen from '../pages/users-list-screen';
import { createBrowserRouter } from 'react-router-dom';
import UsersDetailScreen from '../pages/users-detail-screen';
import { ThemeProvider } from '../themes/theme-provider';
import { CssBaseline } from '@mui/material';



const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <>Sorry for the inconvience caused</>,
    element: (
      <ThemeProvider>
        <CssBaseline />
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ThemeProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/users" replace />,
      },
      {
        path: 'home',
        element: <Navigate to="/users" replace />,
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: (
              <UsersListScreen />
            ),
          },
          { path: ':id', element: <UsersDetailScreen /> }
        ],
      },
    ],
  },
];

const router = createBrowserRouter([...routes, { path: '*', element: <>Page not found</> }]);

export default router;
