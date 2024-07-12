import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";

const BotaoResetarSenhaAluno = ({ aluno }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const modalRef = useRef(null);

  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL;


  const ExcluirAluno = async () => {
    setIsLoading(true);

    try {
      const response = await axios.put(
        `${url}/autenticacao/atualizarSenha`,
        {
          email: aluno.email,
          novaSenha: null,
          isTrocaDeSenhaGenerica: true,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );
      setIsModalOpen(false);
      toast.success('Sucesso! Senha copiada para sua área de transferencia.')


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
    ExcluirAluno()
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
                <img src="../../../public/editar-branco.png" alt="" className="w-6 transition-all hover:cursor-pointer hover:scale-125" onClick={toggleModal}/>


      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-base text-gray-700"
          >
            <h2 className="text-xl font-semibold text-center mb-4 text-zinc-900">
              Deseja realmente resetar a senha do(a) usuário {aluno.email}?
            </h2>
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
                  onClick={handleSubmit}
                  className="px-4 py-2 w-20 bg-green-600 text-white rounded flex justify-center items-center hover:bg-green-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <img
                      src="../../public/loading.png"
                      alt="loading"
                      className="h-6 animate-spin"
                    ></img>
                  ) : (
                    "Resetar"
                  )}
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoResetarSenhaAluno;
