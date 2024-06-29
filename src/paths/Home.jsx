import React, { useEffect, useState } from "react";
import BotaoGenericoVerde from '../components/Botoes/Botao_g_p';
import BotaoGenericoSemBorda from '../components/Botoes/Botao_sem_p';
import { Link } from "react-router-dom";


export default () => {
  return (
    <div className="flex flex-col items-center justify-end min-h-svh mt-8 xl:flex-row xl:justify-center">
      <div className="flex flex-col gap-4 max-w-md border-l-4 pl-4">
        <p className="text-4xl font-bold text-white">Guia definitivo para devs juniros</p>
        <p className="text-2xl font-light text-white">
          Aqui você irá começar a traçar sua trilha como dev. Junte-se ao grupo!
        </p>
        <div className="flex gap-5">
          <Link to="google.com">
          <BotaoGenericoSemBorda texto="Inscrever-se"/>
          </Link>
          <Link to="/login">
          <BotaoGenericoVerde texto="Entrar"/>
          </Link>
        </div>
      </div>
      <img src="../../public/meio.png" alt="" />
    </div>
  );
};
