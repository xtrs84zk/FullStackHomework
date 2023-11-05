
import React, { createContext, FC, useCallback, useContext, useMemo, useReducer } from "react";

type AuthContext = {
  isAuthenticated: false;
  user: null;
  token: null;
} | {
  isAuthenticated: true;
  user: string;
  token: string;
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
} satisfies AuthContext;

type AuthAction = { type: 'LOGIN', payload: { token: string, user: string } } | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContext & { login: (token: string, user: string) => void; logout: () => void }>({
  ...initialState,
  login: () => { },
  logout: () => { },
});

const reducer = (state: AuthContext, action: AuthAction): AuthContext => {
  switch (action.type) {
    case 'LOGIN': {
      const { token, user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        token,
        user,
      };
    }
    case 'LOGOUT': {
      // TODO: remove authorization cookie
      return initialState;
    }
    default:
      return state;
  }
};

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((token: string, user: string) => dispatch({ type: 'LOGIN', payload: { token, user } }), [dispatch]);

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