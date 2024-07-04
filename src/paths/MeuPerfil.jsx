import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthContext";
import CardTurma from "../components/Cards/CardTurma";
import BotaoCriarTurma from "../components/Botoes/Botao_criar_turma";
import { isAdmin } from "../auxiliar/IsAdmin";
import { useParams } from "react-router";
import BotaoGenericoVerdeSalvamento from "../components/Botoes/Botao_salvamento_verde";
import GerenciarMatriculas from "../components/Cards/GerenciarMatriculas";
import FotoPerfil from "../components/Cards/FotoPerfil";

export default () => {



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

  useEffect(() => {
    // const fetchTurmas = async () => {
    //   setIsLoading(true);

    //   try {
    //     const response = await axios.get(
    //       `${url}/turmas/consultarTurma?id=${idTurma}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${tokenJWT}`,
    //         },
    //       }
    //     );

    //     setTurma(response.data.turmas);
    //     setNomeTurma(response.data.turmas.nome); 
    //   } catch (error) {
    //     console.error("Erro ao consultar turma:", error.response);
    //     if (error.response.status == 403) {
    //       logout();
    //       navigate("/login");
    //     }
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // if (tokenJWT) {
    //   fetchTurmas();
    // } else {
    //   console.warn("Token JWT não encontrado no localStorage.");
    // }
  }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoadingAlterarNome(true);
  //   try {
  //     const response = await axios.put(
  //       `${url}/turmas/atualizarDados`,
  //       {
  //         id: turma.id,
  //         nome: nomeTurma,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${tokenJWT}`,
  //         },
  //       }
  //     );
  //     setTurma((prevTurma) => ({
  //       ...prevTurma,
  //       nome: nomeTurma,
  //     }));
  //     setIsSalvoAlterarNome(true)
  //   } catch (error) {
  //   setIsErroAlterarNome(true)
  //     console.error("Erro ao alterar nome da turma:", error.response.status);
  //     if (error.response.status == 403) {
  //       logout();
  //       navigate("/login");
  //     }
  //   } finally {
  //     setIsLoadingAlterarNome(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
      <div className="flex flex-col items-start w-full md:w-1/2 ">
        <div className="pl-7 pr-7 pb-3 flex flex-row w-full justify-center items-center">
          <h2 className="font-medium text-white text-3xl">Meu Perfil</h2>
        </div>
        <div className="p-7 bg-zinc-800 w-full min-w-96  max-h-72 min-h-[87vh] flex shadow-xl shadow-black rounded-t-3xl flex justify-center overflow-y-auto overflow-x-hidden sm:min-h-[85vh]">
          <div className="flex flex-col justify-start items-center w-full">
            <FotoPerfil />
          </div>
        </div>
      </div>
    </div>
  );
};
