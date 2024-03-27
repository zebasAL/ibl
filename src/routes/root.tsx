import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';
import { GuestGuard } from '../layouts';
import Loader from '../components/Loader';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('@/pages/index'));
const Page404 = lazy(() => import('@/pages/404'));

// ----------------------------------------------------------------------

export const rootRoutes = [
  {
    path: '',
    element: (
      <GuestGuard>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        path: "/",
        element: <IndexPage />
      },
      {
        path: "404",
        element: <Page404 />
      },
    ],
  },
];