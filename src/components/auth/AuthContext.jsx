// src/components/auth/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Inicializa o estado de autenticação a partir do localStorage
    const storedAuthState = localStorage.getItem('isAuthenticated');
    const storedToken = localStorage.getItem('tokenJWT');
    return storedAuthState && storedToken != "" ? JSON.parse(storedAuthState) : false;
  });

  const login = (tokenJWT,email,nome,tipo,url_foto) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('tokenJWT', tokenJWT);
    localStorage.setItem('email', email);
    localStorage.setItem('nome', nome);
    localStorage.setItem('tipo', tipo);
    localStorage.setItem('url_foto', url_foto);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tokenJWT');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
    localStorage.removeItem('tipo');
    localStorage.removeItem('url_foto')
  }; 



  useEffect(() => {
    // Atualiza o localStorage sempre que o estado de autenticação mudar
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
