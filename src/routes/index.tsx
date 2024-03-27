import { Navigate, useRoutes } from 'react-router-dom';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { rootRoutes } from './root';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // root routes
    ...rootRoutes,

    // Auth routes
    ...authRoutes,

    // Dashboard routes
    ...dashboardRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
