// src/components/header_footer/Header.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import BotaoGenericoBranco from '../Botoes/Botao_w_p';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OlaPerfil from '../Perfil/OlaPerfil';

const Header = ({nome, urlFoto}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const showLoginButton = location.pathname == '/';
  const nomeUsuario = localStorage.getItem('nome');
  return (
    <header className=" py-4 px-6 h-[72px] flex justify-between items-center flex-col sm:flex-row">

      <Link to="/">
      <div className="flex items-center">
        <img src='../../../public/logo.png' alt="Logo" className="w-28 sm:w-44" />
      </div></Link>
      {showLoginButton && (      <Link to="/login">
      <BotaoGenericoBranco texto="Entrar"/>
      </Link>)}
      {isAuthenticated && !showLoginButton && (<OlaPerfil nome={nome} urlFoto={urlFoto}/>)}
    </header>
  );
};

export default Header;

