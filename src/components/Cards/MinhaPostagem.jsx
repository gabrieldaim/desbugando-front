import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

const TextAreaWithCodeInput = ({idTurma, funcao}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const tokenJWT = localStorage.getItem("tokenJWT");
  const url = import.meta.env.VITE_BACKEND_URL;

  const createPostagem = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${url}/postagem/criar`,
        {
          conteudo: text,
          idTurma: idTurma,
          possuiImagem: false,
          urlImagem: null
        },
        {
          headers: {
            Authorization: `Bearer ${tokenJWT}`,
          },
        }
      );

      funcao(response.data.postagens);
      setText("")
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
  
  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className='flex w-full h-36 gap-3 flex-col items-end'>
      <div className='flex w-full gap-3 justify-center'>
        <img
          src={localStorage.getItem("url_foto") == "null" ? '../../../public/bug.png' : localStorage.getItem("url_foto")}
          alt=""
          className='w-14 h-14 rounded-full object-cover'
        />
        <textarea
          className='bg-zinc-900 text-white resize-none rounded-lg p-2 ring-0 ring-transparent focus:outline-none w-full h-28'
          placeholder='Digite seu texto aqui...'
          value={text}
          onChange={handleChange}
        />
      </div>
      <button
        className='p-2 bg-green-600 text-white font-medium text-base rounded w-28'
        onClick={createPostagem}
      >
        {isLoading ? <img src='../../../public/loading.png' className='animate-spin'></img> : "Publicar"}
      </button>
    </div>
  );
};

export default TextAreaWithCodeInput;
