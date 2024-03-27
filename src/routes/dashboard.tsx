import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';
import { AuthGuard, MainLayout } from '../layouts';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('@/pages/dashboard/index'));
const UsersIndexPage = lazy(() => import('@/pages/dashboard/users/index'));
const UserIdPage = lazy(() => import('@/pages/dashboard/users/id'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <MainLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      { path: "", element: <IndexPage />, index: true },
      { 
        path: 'users',
        children: [
          { element: <UsersIndexPage />, index: true },
          { path: ':id', element: <UserIdPage /> }
        ]
      },
    ],
  },
];
