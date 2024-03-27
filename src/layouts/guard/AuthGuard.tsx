import { useEffect, useCallback, useState } from 'react';
import { paths } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/auth-context';
import LoadingScreen from '@/components/LoadingScreen';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  const { authenticated, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const href = `${paths.auth.login}?${searchParams}`;

      navigate(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    if (loading === true) return
    check();
  }, [loading, authenticated]);

  if (!checked) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}