import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";

const BotaoCriarAluno = ({ funcao }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeAluno, setNomeAluno] = useState("");
  const [emailAluno, setEmailAluno] = useState("");
  const [tipo, setTipo] = useState("ALUNO");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const modalRef = useRef(null);

  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL;

  const copyToClipboard = (senha) => {
    navigator.clipboard.writeText(senha).then(() => {
      toast.success('A senha generica do aluno foi copiada!')
    }).catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
  };


  const CreateAluno = async (nomeAluno,emailAluno,tipo) => {
    setIsLoading(true);
    console.log(nomeAluno,emailAluno,tipo);
    try {
      const response = await axios.post(
        `${url}/autenticacao/criar`,
        {
          nome: nomeAluno,
          email: emailAluno,
          tipo: tipo,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );

      const novaTurma = {
        id: response.data.uuid,
        email: emailAluno,
        nome: response.data.nome,
      };

      funcao((alunosAntigos) => [...alunosAntigos, novaTurma]);
      setIsModalOpen(false);
      setNomeAluno("");
      setEmailAluno("");
      setTipo("ALUNO");
      copyToClipboard(response.data.senhaGenerica)
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
      setErro("erro na base de dados");
      if (error.response.status == 403) {
        console.log("Erro 403");
        logout();
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateAluno(nomeAluno,emailAluno,tipo)
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div>
      <button
        className="rounded-full bg-transparent p-2 text-base font-semibold text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-zinc-950"
        onClick={toggleModal}
      >
        Criar usuário +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-base text-gray-700"
          >
            <h2 className="text-xl font-semibold mb-4 text-zinc-900">
              Cadastrar Novo Usuário
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block ">Nome do Usuário</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={nomeAluno}
                  onChange={(e) => setNomeAluno(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block ">Email do Usuário</label>
                <input
                  type="email"
                  className="mt-1 p-2 border rounded w-full"
                  value={emailAluno}
                  onChange={(e) => setEmailAluno(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block ">Tipo de Usuario</label>
                <select
                  className="mt-1 p-2 border rounded w-full text-zinc-900"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="ALUNO">ALUNO</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              {erro && <p className="text-red-700">Erro ao cadastrar aluno</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={toggleModal}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 w-20 bg-green-600 text-white rounded flex justify-center items-center hover:bg-green-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <img
                      src="../../public/loading.png"
                      alt="loading"
                      className="h-6 animate-spin"
                    ></img>
                  ) : (
                    "Criar"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoCriarAluno;
