// src/components/header_footer/Header.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import BotaoGenericoBranco from '../Botoes/Botao_w_p';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OlaPerfil from '../Perfil/OlaPerfil';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showLoginButton = location.pathname == '/';
  const nomeUsuario = localStorage.getItem('nome');
  return (
    <header className=" py-4 px-6 flex justify-between items-center">

      <Link to="/">
      <div className="flex items-center">
        <img src='../../../public/logo.png' alt="Logo" className="" />
      </div></Link>
      {showLoginButton && (      <Link to="/login">
      <BotaoGenericoBranco texto="Entrar"/>
      </Link>)}
      {isAuthenticated && !showLoginButton && (<OlaPerfil/>)}
    </header>
  );
};

export default Header;

