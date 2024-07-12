import axios from "axios";
import React, { useEffect, useState } from "react";
import BotaoGenericoVerdeSalvamento from "../Botoes/Botao_salvamento_verde";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
import BotaoCriarAluno from "../Botoes/Botao_criar_aluno";
import BotaoExcluirAluno from "../Botoes/Botao_excluir_aluno";
import BotaoResetarSenhaAluno from "../Botoes/Botao_resetar_senha_aluno";


const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o texto de pesquisa

  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL;
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${url}/user/listar`,
          {
            headers: {
              Authorization: `Bearer ${tokenJWT}`,
            },
          }
        );

        console.log("Dados dos usuários:", response.data.usuarios);
        setUsuarios(response.data.usuarios);
      } catch (error) {
        console.error("Erro ao consultar usuarios:", error);
        if (error.response.status === 403) {
          logout();
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (tokenJWT) {
      fetchUsuarios();
    } else {
      console.warn("Token JWT não encontrado no localStorage.");
    }
  }, [tokenJWT, logout, navigate, url]);

  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    normalizeText(usuario.nome).includes(normalizeText(searchTerm))
  );

  return (
    <div className="flex flex-col justify-start items-center w-full mt-6">
      <div className="text-xl text-white font-medium w-full flex items-center flex-col gap-2">
        <div className="flex justify-between w-full items-center">
          Gerenciar usuários:
          <BotaoCriarAluno funcao={setUsuarios} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Pesquisar usuários..."
          className="p-2 mb-4 w-full rounded ring-0 ring-transparent focus:outline-none text-zinc-900 font-normal text-base"
        />
        <div className="bg-zinc-900 w-full rounded-lg flex flex-row text-base pl-4 pr-4 pt-2 pb-2 mb-14">
          <div className="flex flex-col w-full border-r-2 border-zinc-800 gap-2">
            <p>Nome</p>
            {filteredUsuarios.map((item) => (
              <p className="font-light border-b-2 border-zinc-800 pb-2" key={item.id}>
                {item.nome}
              </p>
            ))}
          </div>
          <div className="flex flex-col w-32 items-center gap-2">
            <p>Ações</p>
            {filteredUsuarios.map((item) => (
              <div
                className="font-light border-b-2 border-zinc-800 pb-2 w-full flex justify-center gap-2"
                key={item.id}
              >
                <BotaoResetarSenhaAluno aluno={item}/>
                <BotaoExcluirAluno funcao={setUsuarios} aluno={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciarUsuarios;
