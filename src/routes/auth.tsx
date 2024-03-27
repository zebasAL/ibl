import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { GuestGuard, AuthLayout } from '../layouts';
import Loader from '../components/Loader';

// ----------------------------------------------------------------------

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));

// ----------------------------------------------------------------------

export const authRoutes = [
  { path: 'auth', element: <Navigate to="/auth/login" replace /> },
  {
    path: 'auth',
    element: (
      <GuestGuard>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: (
          <AuthLayout title="LOGIN" image="https://www.sme-news.co.uk/wp-content/uploads/2021/11/Login.jpg">
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "register",
        element: (
          <AuthLayout title="REGISTER" image="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg">
            <RegisterPage />
          </AuthLayout>
        ),
      },
    ],
  },
];