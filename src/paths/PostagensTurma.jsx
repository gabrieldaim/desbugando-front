import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthContext";
import CardTurma from "../components/Cards/CardTurma";
import BotaoCriarTurma from "../components/Botoes/Botao_criar_turma";
import { isAdmin } from "../auxiliar/IsAdmin";
import { useLocation, useNavigate, useParams } from "react-router";
import MinhaPostagem from "../components/Cards/MinhaPostagem";
import PostagemCard from "../components/Cards/Postagens";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [postagens, setPostagens] = useState([]);
  const { logout } = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const { idTurma } = useParams();
  const location = useLocation();
  const { nome } = location.state || {};

  useEffect(() => {
    const tokenJWT = localStorage.getItem("tokenJWT");

    const fetchTurma = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${url}/postagem/listar?id=${idTurma}`,
          {
            headers: {
              Authorization: `Bearer ${tokenJWT}`,
            },
          }
        );

        console.log("Dados da turma:", response.data.postagens);
        setPostagens(response.data.postagens);
      } catch (error) {
        console.error("Erro ao consultar turma:", error.response);
        if (error.response.status == 403) {
          logout();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (tokenJWT) {
      fetchTurma();
    } else {
      console.warn("Token JWT não encontrado no localStorage.");
    }
  }, []);

  function voltarTurmas(){
    navigate("/turmas")
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
      <div className="flex flex-col items-start w-full md:w-1/2 ">
        <div className="pl-7 pr-7 pb-3 flex flex-row w-full justify-center items-center relative">
        <img src="../../public/voltar.png" alt="" className="w-8 absolute left-0 transition-all hover:cursor-pointer hover:scale-110" onClick={voltarTurmas}/>
          <h2 className="text-base font-medium text-white sm:text-3xl">{nome}</h2>
        </div>
        <div className="p-2 bg-zinc-800 w-full min-w-96 gap-8 max-h-72 min-h-[87vh] flex shadow-xl shadow-black rounded-t-3xl justify-start overflow-y-auto overflow-x-hidden sm:min-h-[85vh] flex-col sm:p-10 sm:pl-16 sm:pr-16">
          <MinhaPostagem className="h-96" idTurma={idTurma} funcao={setPostagens}/>
          <div className="border-t border-zinc-700 my-4"></div>
          <div className="flex flex-row flex-wrap gap-4 justify-start items-start h-full">
            {postagens.slice().reverse().map((item) => (
              <PostagemCard postagem={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
