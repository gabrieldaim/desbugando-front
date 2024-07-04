import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';


const BotaoCriarTurma = ({funcao}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nomeTurma, setNomeTurma] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const modalRef = useRef(null);

  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL
  const CreateTurma = async (nomeTurma) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${url}/turmas/criar`,
        {
          nome: nomeTurma,  
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );

      const novaTurma = {
        id: response.data.id, 
        nome: response.data.nome,
        dataCriacao: response.data.dataCriacao,
      };
  
      funcao((turmasAntigas) => [...turmasAntigas, novaTurma]);
      setIsModalOpen(false);
      setNomeTurma("")
    } catch (error) {
      console.error("Erro ao deletar turma:", error);
      setErro("erro na base de dados")
      if (error.response.status == 403) {
        console.log("Erro 403")
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
    CreateTurma(nomeTurma)    
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div>
      <button
        className="rounded-md bg-white px-8 py-2 text-base font-semibold text-zinc-900 shadow-sm transition-colors duration-200 ease-in-out hover:bg-gray-200"
        onClick={toggleModal}
      >
        Criar turma
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Cadastrar Nova Turma</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nome da Turma</label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={nomeTurma}
                  onChange={(e) => setNomeTurma(e.target.value)}
                  required
                />
              </div>
              {erro && <p className='text-red-700'>Erro ao cadastrar turma</p>}
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
                  {isLoading ? <img src="../../public/loading.png" alt="loading" className="h-6 animate-spin"></img> : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotaoCriarTurma;
