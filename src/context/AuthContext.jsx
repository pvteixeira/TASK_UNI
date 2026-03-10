import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return null;
  }
};

const initialState = {
  user: safeParse('taskuni_user'),
  isAuthenticated: !!localStorage.getItem('taskuni_user'),
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('taskuni_user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      localStorage.removeItem('taskuni_user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'REGISTER':
      // In a real app, we'd hit an API. Here we just store in localStorage 'users' list
      const users = JSON.parse(localStorage.getItem('taskuni_registered_users')) || [];
      const userExists = users.find(u => u.email === action.payload.email);
      
      if (userExists) {
        throw new Error('Usuário já cadastrado');
      }
      
      const newUser = { ...action.payload, id: Date.now().toString() };
      users.push(newUser);
      localStorage.setItem('taskuni_registered_users', JSON.stringify(users));
      
      // Auto-login after register
      localStorage.setItem('taskuni_user', JSON.stringify(newUser));
      return {
        ...state,
        user: newUser,
        isAuthenticated: true,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('taskuni_registered_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return user;
    } else {
      throw new Error('E-mail ou senha incorretos');
    }
  };

  const register = (userData) => {
    dispatch({ type: 'REGISTER', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
