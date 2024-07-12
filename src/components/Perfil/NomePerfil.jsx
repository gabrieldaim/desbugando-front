import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";

const NomePerfil = ({setNome}) => {
  const [nome, setNomeTemp] = useState(localStorage.getItem("nome"));
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [salvo, setSalvo] = useState();


  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${url}/user/atualizarDados`,
        {
          nome: nome,
          urlLinkedin: null,
          urlGithub: null,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );
      localStorage.setItem("nome",nome)
      setNome(nome)
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
  };

  return (
    <div className="flex flex-col justify-start items-center w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center "
            >
              <label className="text-xl text-white  font-medium w-full flex items-center flex-col gap-2">
                <div className="flex justify-start w-full">
                Nome:
                </div>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => {
                        setNomeTemp(e.target.value)
                        setErro(false)
                        setSalvo(false)
                    }
                    }
                    className=" text-lg w-full rounded-lg text-zinc-900 pl-2 shadow-none ring-0 ring-transparent focus:outline-none focus:border-zinc-500"
                  />

                    <div className="flex w-full justify-end">
                    <BotaoGenericoVerdeSalvamento
                      loading={isLoading}
                      erro={erro}
                      salvo={salvo}
                      />
                    </div>

              </label>
            </form>
          </div>
  );
};

export default NomePerfil;
