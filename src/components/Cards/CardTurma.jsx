import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';

export default function CardTurma({ id, nome, criacao, onClick, funcao }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const dropdownRef = useRef(null);
  const tokenJWT = localStorage.getItem('tokenJWT');
  const { logout } = useAuth();

  const navigate = Navigate;
  const url = import.meta.env.VITE_BACKEND_URL
  function convertendoData(criacao) {
    const date = new Date(criacao);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setErro("")
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const DeleteTurma = async (key) => {
    setIsLoading(true);

    try {
      const response = await axios.delete(
        `${url}/turmas/deletar`,
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
          data: {
            id: key, 
          },
        }
      );
      funcao();
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

  return (
    <div 
      onClick={onClick} 
      className={`relative bg-zinc-900 h-36 flex-grow rounded-xl shadow-md p-3 min-w-64 flex flex-col justify-between cursor-pointer transition hover:bg-zinc-950 hover:scale-105 ${isDropdownOpen ? 'z-20' : 'z-10'}`}
    >
      <div className='flex justify-between items-center'>
        <h3 className='font-semibold text-white'>{nome}</h3>
        <div ref={dropdownRef} className='relative '>
        {localStorage.getItem('tipo') == "ADMIN" &&           <img
            src="../../../public/menu.png"
            alt="menu"
            className='p-1 h-7 rounded-full transition hover:bg-zinc-800'
            onClick={toggleDropdown}
          />}
          {isDropdownOpen && (
            <div className="absolute top-8 right-0 mt-0 w-48 bg-white rounded-md shadow-lg z-20 ">
              <ul className="py-1">
                <li>
                  <a
                    href={`/turma/${id}`}
                    className="block px-4 py-2 text-gray-800 font-semibold flex flex-row justify-start items-center gap-3 hover:bg-gray-200"
                  >
                    <img src="../../../public/editar.png" alt="" className='h-5'/>
                    Editar turma
                  </a>
                </li>
                <li>
                  <a
                    className="block px-4 py-2 text-gray-800 font-semibold flex flex-row justify-start gap-3 hover:bg-red-100"
                    onClick={isLoading ? console.log("carregando função de deletar") : ()=> DeleteTurma(id)}
                  >
                    {isLoading ? <img src="../../public/loadingPreto.png" alt="loading" className="h-6 animate-spin"></img> : <img src="../../../public/excluir.png" alt="" className='w-5'/>}
                    {isLoading ? "Excluindo..." : erro == "" ? "Excluir turma" : "Erro na exclusão"}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-sm font-light text-white'>Criada em: {convertendoData(criacao)}</p>
        <img src="../../../public/seta.png" alt="" className='w-6 transition hover:scale-110' />
      </div>
    </div>
  );
}
