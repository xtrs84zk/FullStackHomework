
import React, { createContext, FC, useCallback, useContext, useMemo, useReducer } from "react";
import type { User } from "../types";
import { USER_KEY } from "../constants";

type AuthContext =
  | { isAuthenticated: false; user: null; }
  | { isAuthenticated: true; user: User; }

const storedUser = localStorage.getItem(USER_KEY);
const initialState: AuthContext = {
  isAuthenticated: !!storedUser,
  user: storedUser ? JSON.parse(storedUser) : null,
};

type AuthAction = { type: 'LOGIN', payload: { user: User } } | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContext & { login: (user: User) => Promise<void>; logout: () => void }>({
  ...initialState,
  login: async () => { },
  logout: () => { },
});

const reducer = (state: AuthContext, action: AuthAction): AuthContext => {
  switch (action.type) {
    case 'LOGIN': {
      const { user } = action.payload;
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      localStorage.removeItem(USER_KEY);
      return initialState;
    }
    default:
      return state;
  }
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (user: User) => dispatch({ type: 'LOGIN', payload: { user } }), [dispatch]);

  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [dispatch]);

  const value = useMemo(() => ({ ...state, login, logout }), [state, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider };