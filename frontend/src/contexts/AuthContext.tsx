import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'cliente';
}

interface AuthContextType {
  user: User | null;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Definir página inicial baseada no role
      setCurrentPage(parsedUser.role === 'admin' ? 'dashboard' : 'perfil');
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const loggedUser: User = data.user;
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        // Definir página inicial baseada no role
        setCurrentPage(loggedUser.role === 'admin' ? 'dashboard' : 'perfil');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      // Fallback para autenticação local se o backend não estiver disponível
      if (email === 'admin@vocealuga.com' && password === 'admin123') {
        const adminUser: User = {
          id: 1,
          email: 'admin@vocealuga.com',
          name: 'Administrador',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        setCurrentPage('dashboard');
        return true;
      } else if (email === 'cliente@teste.com' && password === '123456') {
        const clienteUser: User = {
          id: 2,
          email: 'cliente@teste.com',
          name: 'João Silva',
          role: 'cliente'
        };
        setUser(clienteUser);
        localStorage.setItem('user', JSON.stringify(clienteUser));
        setCurrentPage('perfil');
        return true;
      }
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    currentPage,
    setCurrentPage,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
