import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { isValidToken, setSession, createToken, getPayloadToken } from '../hooks/useToken';
import { AuthContext } from './auth-context';

export type StateType = {
  user: {
    email: string,
    [key: string]: string,
  } | null
  loading: boolean,
  authenticated: boolean,
  login: (email: string, password: string) => void,
  register: (email: string, password: string, firstName: string, lastName: string) => void,
  logout: () => void,
}

// Definir las acciones posibles
export type ActionType =
  | { type: 'INITIAL'; payload: { user: StateType["user"], authenticated: boolean } }
  | { type: 'LOGIN' | 'REGISTER'; payload: { user: StateType["user"] } }
  | { type: 'LOGOUT' };

export const initialState = {
  user: null,
  loading: true,
  authenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
};

const reducer = (state: StateType, action: ActionType): StateType => {
  if (action.type === 'INITIAL') {
    return {
      ...state,
      loading: false,
      authenticated: action.payload?.authenticated ?? false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      authenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      authenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      authenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      const isValid = await isValidToken(accessToken)

      if (accessToken && isValid) {
        setSession(accessToken);

        const data = getPayloadToken(accessToken)

        dispatch({
          type: 'INITIAL',
          payload: {
            authenticated: true,
            user: data,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            authenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          authenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (email: string, password: string) => {
    const data = { email, password };
    const token = await createToken(data)
    setSession(token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: data,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    const data = {
      email,
      firstName,
      lastName,
      password,
    };
    const token = await createToken(data)
    setSession(token)
    dispatch({
      type: 'REGISTER',
      payload: {
        user: data,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(undefined);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status, state.authenticated, state.loading]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}