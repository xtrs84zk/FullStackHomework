
import React, { createContext, FC, useContext, useMemo, useReducer } from "react";

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

const AuthContext = createContext<{ state: AuthContext; dispatch: React.Dispatch<AuthAction>; }>({
  state: initialState,
  dispatch: () => null,
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

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext).state;

export { AuthContext, AuthProvider };