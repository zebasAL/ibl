import { useContext, createContext } from 'react';
import { StateType, initialState } from "./AuthProvider"

// --------------------------------------------------


export const AuthContext = createContext<StateType>(initialState);

// --------------------------------------------------

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be use inside AuthProvider');

  return context;
};
