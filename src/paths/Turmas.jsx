import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAuth } from "../components/auth/AuthContext";
import CardTurma from "../components/Cards/CardTurma";
import BotaoCriarTurma from "../components/Botoes/Botao_criar_turma";
import { isAdmin } from "../auxiliar/IsAdmin";
import { useNavigate } from "react-router";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [turmas, setTurmas] = useState([]);
  const { logout } = useAuth();
  const url = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  useEffect(() => {
    const tokenJWT = localStorage.getItem("tokenJWT");

    const fetchTurmas = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${url}/turmas/consultar`,
          {
            headers: {
              Authorization: `Bearer ${tokenJWT}`,
            },
          }
        );

        console.log("Dados das turmas:", response.data.turmas);
        setTurmas(response.data.turmas);
      } catch (error) {
        console.error("Erro ao consultar turmas:", error.response.status);
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

  const handleClick = (id,nome) => {
    navigate(`/postagensTurma/${id}`, { state: { nome: nome } });
  };

  const excluirTurmas = (id) => {
    const novasTurmas = turmas.filter(turma => turma.id !== id);
    setTurmas(novasTurmas);
  }
  return (
    <div className="flex flex-col items-center justify-center mt-5 ">
      <div className="flex flex-col items-start w-full md:w-1/2 ">
        <div className="pl-7 pr-7 pb-3 flex flex-row w-full justify-between items-center">
          <h2 className="text-base font-medium text-white sm:text-3xl">Minhas Turmas</h2>
          {isAdmin() && <BotaoCriarTurma funcao={setTurmas}/>}
        </div>
        <div className="p-7 bg-zinc-800 w-full min-w-96  max-h-72 min-h-[87vh] flex shadow-xl shadow-black rounded-t-3xl flex justify-center overflow-y-auto overflow-x-hidden sm:min-h-[85vh]">
          <div className="flex flex-row flex-wrap gap-4 justify-start items-start h-full">
            {turmas.map((item) => (
              <CardTurma
                key={item.id}
                id={item.id}
                nome={item.nome}
                criacao={item.dataCriacao}
                onClick={() => handleClick(item.id,item.nome)}
                funcao={() => excluirTurmas(item.id)}  
                
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
