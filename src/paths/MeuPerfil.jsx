import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthContext";
import CardTurma from "../components/Cards/CardTurma";
import BotaoCriarTurma from "../components/Botoes/Botao_criar_turma";
import { isAdmin } from "../auxiliar/IsAdmin";
import { useNavigate, useParams } from "react-router";
import BotaoGenericoVerdeSalvamento from "../components/Botoes/Botao_salvamento_verde";
import GerenciarMatriculas from "../components/Cards/GerenciarMatriculas";
import FotoPerfil from "../components/Perfil/FotoPerfil";
import NomePerfil from "../components/Perfil/NomePerfil";
import TrocaSenha from "../components/Perfil/TrocaSenha";
import DadosPerfil from "../components/Perfil/DadosPerfil";
import GerenciarUsuarios from "../components/Perfil/GerenciarUsuarios";

export default ({setNome,setUrlFoto}) => {



  const [nome, SetNome] = useState(localStorage.getItem("nome"));	
  const [tipo,setTipo] = useState(localStorage.getItem("tipo"))
  const [loadingNome,setLoadingNome] = useState(false)
  const [loadingCriaUsuario,setLoadingCriaUsuario] = useState(false)
  const [loadingResetaSenha,setLoadingResetaSenha] = useState(false)
  const [loadingDeletaUsuario,setLoadingDeletaUsuario] = useState(false)
  const [loadingResetaSenhaUsuario,setLoadingResetaSenhaUsuario] = useState(false)


  const { logout } = useAuth();
  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();

  function voltarTurmas(){
    navigate("/turmas")
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
      <div className="flex flex-col items-start w-full md:w-1/2 ">
        <div className="pl-7 pr-7 pb-3 flex flex-row w-full justify-center items-center relative">
        <img src="../../public/voltar.png" alt="" className="w-8 absolute left-0 transition-all hover:cursor-pointer hover:scale-110" onClick={voltarTurmas}/>
          <h2 className="font-medium text-white text-3xl">Meu Perfil</h2>
        </div>
        <div className="p-7 bg-zinc-800 w-full min-w-96  max-h-72 min-h-[87vh] flex shadow-xl shadow-black rounded-t-3xl flex justify-center overflow-y-auto overflow-x-hidden sm:min-h-[85vh]">
          <div className="flex flex-col justify-start items-center w-full xl:w-[30vw] xl:max-w-[520px]">
            <FotoPerfil setUrlFoto={setUrlFoto}/>
            <NomePerfil setNome={setNome}/>
            <DadosPerfil />
            <TrocaSenha />
            {tipo=="ADMIN" && <GerenciarUsuarios/>}
          </div>
        </div>
      </div>
    </div>
  );
};
