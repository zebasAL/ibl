import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';
import { GuestGuard, MainLayout } from '../layouts';
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('@/pages/404'));
const RootPage = lazy(() => import('@/pages/index'));

// ----------------------------------------------------------------------

export const rootRoutes = [
  {
    path: '',
    element: (
      <GuestGuard>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        path: "/",
        element: <MainLayout><RootPage /></MainLayout>
      },
      {
        path: "404",
        element: <Page404 />
      },
    ],
  },
];