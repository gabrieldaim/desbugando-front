import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";

const DadosPerfil = () => {
  const [urlGithub, setUrlGithub] = useState("");
  const [urlLinkedin, setUrlLinkedin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [salvo, setSalvo] = useState();

  const urlGitAtual = localStorage.getItem("url_github");
  const urlLinkedinAtual = localStorage.getItem("url_linkedin");
  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL;



  useEffect(() => {
    if(urlGitAtual != "null"){
      setUrlGithub(urlGitAtual);
    }
    if(urlLinkedinAtual != "null"){
      setUrlLinkedin(urlLinkedinAtual);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${url}/user/atualizarDados`,
        {
          nome: null,
          urlLinkedin: urlLinkedin,
          urlGithub: urlGithub,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );
      if(urlGithub != ""){
        localStorage.setItem("url_github", urlGithub);
      }else{
        localStorage.setItem("url_github", "null");
      }
      if(urlLinkedin != ""){
        localStorage.setItem("url_linkedin", urlLinkedin);
      }else{
        localStorage.setItem("url_linkedin", "null");
      }
      setSalvo(true);
    } catch (error) {
      setErro(true);
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
        <div className="flex justify-start w-full text-xl text-white  font-medium mb-3 mt-8">
          Dados do usuário:
        </div>
        <label className="text-base text-white w-full flex items-center flex-col gap-1">
          <div className="flex justify-start w-full">Link do Github:</div>
          <input
            type="text"
            value={urlGithub}
            onChange={(e) => {
              setUrlGithub(e.target.value);
              setErro(false);
              setSalvo(false);
            }}
            className=" text-lg w-full rounded-lg text-zinc-900 pl-2 shadow-none ring-0 ring-transparent focus:outline-none focus:border-zinc-500"
          />
        </label>
        <label className="text-base text-white w-full flex items-center flex-col gap-1 mt-2">
          <div className="flex justify-start w-full">Link do Linkedin:</div>
          <input
            type="text"
            value={urlLinkedin}
            onChange={(e) => {
              setUrlLinkedin(e.target.value);
              setErro(false);
              setSalvo(false);
            }}
            className=" text-lg w-full rounded-lg text-zinc-900 pl-2 shadow-none ring-0 ring-transparent focus:outline-none focus:border-zinc-500"
          />
        </label>
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

export default DadosPerfil;
