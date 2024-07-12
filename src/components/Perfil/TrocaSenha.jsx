import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";

const TrocaSenha = () => {
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [salvo, setSalvo] = useState();


  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if(senha == senhaConfirmacao){
        try {
            const response = await axios.put(
              `${url}/autenticacao/atualizarSenha`,
              {
                email: localStorage.getItem("email"),
                novaSenha: senha,
                isTrocaDeSenhaGenerica: false,
              },
              {
                headers: {
                  Authorization: `Bearer ${tokenJWT}`,
                },
              }
            );

            setSalvo(true)
          } catch (error) {
          setErro(true)
            if (error.response.status == 403) {
              logout();
              navigate("/login");
            }
          } finally {
            setIsLoading(false);
          }
    }else{
        setIsLoading(false)
        setErro(true)
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center"
            >
                <div className="flex justify-start w-full text-xl text-white  font-medium mb-3 mt-8">
                Trocar de senha:
                </div>
              <label className="text-base text-white w-full flex items-center flex-col gap-1">
                <div className="flex justify-start w-full">
                Nova senha:
                </div>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value)
                        setErro(false)
                        setSalvo(false)
                    }
                    }
                    className=" text-lg w-full rounded-lg text-zinc-900 pl-2 shadow-none ring-0 ring-transparent focus:outline-none focus:border-zinc-500"
                  />
              </label>
              <label className="text-base text-white w-full flex items-center flex-col gap-1 mt-2">
                <div className="flex justify-start w-full">
                Confirmar senha:
                </div>
                  <input
                    type="password"
                    value={senhaConfirmacao}
                    onChange={(e) => {
                        setSenhaConfirmacao(e.target.value)
                        setErro(false)
                        setSalvo(false)
                    }
                    }
                    className=" text-lg w-full rounded-lg text-zinc-900 pl-2 shadow-none ring-0 ring-transparent focus:outline-none focus:border-zinc-500"
                  />
              </label>
              {erro && (
            <p className="text-center font-bold text-white w-full bg-red-500 p-1 rounded-md mt-3">
              As senhas digitadas não coincidem.
            </p>
          )}
              <div className="flex w-full justify-end pt-3">
                    <BotaoGenericoVerdeSalvamento
                      loading={isLoading}
                      erro={erro}
                      salvo={salvo}
                      />
                    </div>
            </form>
          </div>
  );
};

export default TrocaSenha;
