import React, { useEffect, useState } from "react";
import BotaoGenericoVerde from "../components/Botoes/Botao_g_p";
import BotaoGenericoSemBorda from "../components/Botoes/Botao_sem_p";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";
import BotaoGenericoVerdeGrande from "../components/Botoes/Botao_g_g";
import axios from "axios";

export default () => {
  const { isAuthenticated } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/turmas");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const erroLogin = 400;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Submit");
      const response = await axios.post(
        "http://localhost:8080/autenticacao/login",
        {
          email,
          senha,
        }
      );
      const data = response.data;
      console.log("Resposta da API:", data);
      login(data.token, data.email, data.nome, data.tipo,data.url_foto);
      navigate("/turmas");
    } catch (error) {
      console.log(error)
      if (error.response) {
        if (error.response.status) {
          console.log("achou o status:", error.response.status)
          setErro(error.response.status);
        } else {
          console.log("achou o nada:", error)
          setErro(error);
        }
      }else{
        console.log("achou o nada:", error)
        setErro(error);
      }
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse items-center justify-start min-h-svh mt-8 xl:flex-row xl:justify-center">
      <img src="../../public/meiomulher.png" alt="" className="min-w-96" />
      <div className="flex flex-col gap-3 items-center">
        <div className="flex flex-col gap-4 max-w-md border-l-4 pl-4">
          <p className="text-4xl font-bold text-white">Acesse sua conta</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email:
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block p-1 font-medium w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Senha:
                </label>
              </div>
              <div>
                <input
                  id="senha"
                  name="senha"
                  type="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="block p-1 font-medium w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="-mt-4"
            disabled={isLoading}>
              <BotaoGenericoVerdeGrande texto={isLoading ? <img src="../../public/loading.png" alt="loading" className="h-6 animate-spin"></img> : "Entrar"} />
            </div>
          </form>
          {erro == erroLogin && (
            <p className="text-center font-bold text-red-800 max-w-10">
              Login e/ou senha inválidos.
            </p>
          )}
          {erro != erroLogin && erro != "" && (
            <p className="text-center font-bold text-red-800 max-w-72">
              Erro ao efetuar login, tente novamente mais tarde.
            </p>
          )}
        </div>
        <div className="text-sm pl-4">
          <a href="#" className="font-light text-white">
            Esqueci a senha
          </a>
        </div>
        <p className="max-w-80 text-center text-white mt-8">
          No momento, as inscrições estão encerradas. Em breve , novas turmas
          serão abertas. Fique por dentro nas nossas redes sociais.
        </p>
      </div>
    </div>
  );
};
