import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { useAuthContext } from '../../context/auth-context';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || paths.root;

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      navigate(returnTo);
    }
  }, [authenticated, returnTo, navigate]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}