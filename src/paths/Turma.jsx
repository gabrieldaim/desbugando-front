import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthContext";
import CardTurma from "../components/Cards/CardTurma";
import BotaoCriarTurma from "../components/Botoes/Botao_criar_turma";
import { isAdmin } from "../auxiliar/IsAdmin";
import { useNavigate, useParams } from "react-router";
import BotaoGenericoVerdeSalvamento from "../components/Botoes/Botao_salvamento_verde";
import GerenciarMatriculas from "../components/Cards/GerenciarMatriculas";

export default () => {
  const { idTurma } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAlterarNome, setIsLoadingAlterarNome] = useState(false);
  const [isSalvoAlterarNome, setIsSalvoAlterarNome] = useState(false);
  const [isErroAlterarNome, setIsErroAlterarNome] = useState(false);


  const [turma, setTurma] = useState([]);
  const [nomeTurma, setNomeTurma] = useState("");
  const { logout } = useAuth();
  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTurmas = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${url}/turmas/consultarTurma?id=${idTurma}`,
          {
            headers: {
              Authorization: `Bearer ${tokenJWT}`,
            },
          }
        );

        setTurma(response.data.turmas);
        setNomeTurma(response.data.turmas.nome); 
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
      fetchTurmas();
    } else {
      console.warn("Token JWT não encontrado no localStorage.");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingAlterarNome(true);
    try {
      const response = await axios.put(
        `${url}/turmas/atualizarDados`,
        {
          id: turma.id,
          nome: nomeTurma,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );
      setTurma((prevTurma) => ({
        ...prevTurma,
        nome: nomeTurma,
      }));
      setIsSalvoAlterarNome(true)
    } catch (error) {
    setIsErroAlterarNome(true)
      console.error("Erro ao alterar nome da turma:", error.response.status);
      if (error.response.status == 403) {
        logout();
        navigate("/login");
      }
    } finally {
      setIsLoadingAlterarNome(false);
    }
  };

  function voltarTurmas(){
    navigate("/turmas")
  }

  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
      <div className="flex flex-col items-start w-full md:w-1/2 ">
        <div className="pl-7 pr-7 pb-3 flex flex-row w-full justify-center items-center relative">
          <img src="../../public/voltar.png" alt="" className="w-8 absolute left-0 transition-all hover:cursor-pointer hover:scale-110" onClick={voltarTurmas}/>
          <h2 className="font-medium text-white text-3xl">Editar Turma</h2>
        </div>
        <div className="p-7 bg-zinc-800 w-full min-w-96  max-h-72 min-h-[87vh] flex shadow-xl shadow-black rounded-t-3xl flex justify-center overflow-y-auto overflow-x-hidden sm:min-h-[85vh]">
          <div className="flex flex-col justify-start items-center w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center "
            >
              <label className="text-xl text-white  font-medium w-full flex items-center">
                Nome:
                  <input
                    type="text"
                    value={nomeTurma}
                    onChange={(e) => {
                        setNomeTurma(e.target.value)
                        setIsErroAlterarNome(false)
                        setIsSalvoAlterarNome(false)
                    }
                    }
                    className="border-b-2 border-zinc-700 bg-transparent pl-3.5 py-2  text-white shadow-none ring-0 ring-transparent text-xl h-11 focus:outline-none focus:border-zinc-500 w-full"
                  />

                      <BotaoGenericoVerdeSalvamento
                      loading={isLoadingAlterarNome}
                      erro={isErroAlterarNome}
                      salvo={isSalvoAlterarNome}
                      />

              </label>
            </form>
            <GerenciarMatriculas turmaProps={turma}/>
          </div>
        </div>
      </div>
    </div>
  );
};
