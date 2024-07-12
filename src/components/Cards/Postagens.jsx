import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';

const PostagemCard = ({postagem}) => {

  function formatarData(dataString) {
    const data = new Date(dataString);
    const horas = (`0${data.getHours()}`).slice(-2); // Obtém as horas (com zero à esquerda se necessário)
    const minutos = (`0${data.getMinutes()}`).slice(-2); // Obtém os minutos (com zero à esquerda se necessário)
    const dia = (`0${data.getDate()}`).slice(-2); // Obtém o dia do mês (com zero à esquerda se necessário)
    const mes = (`0${data.getMonth() + 1}`).slice(-2); // Obtém o mês (lembre-se de adicionar +1 pois o mês começa do zero)
    const ano = data.getFullYear(); // Obtém o ano
  
    return `${horas}:${minutos} ${dia}/${mes}/${ano}`;
  }

  return (
    <div className='flex w-full h-36 gap-3 flex-col items-end'>
      <div className='flex w-full gap-3 justify-center'>
        <img
          src={postagem.usuarios.urlFoto == null ? '../../../public/bug.png' : postagem.usuarios.urlFoto}
          alt=""
          className='w-14 h-14 rounded-full object-cover'
        />
        <div className='flex flex-col w-full'>
        <div className='flex justify-between'>
        <div className='flex items-center gap-1'>
        <p className='text-white font-bold'>{postagem.usuarios.nome}</p>  
        {postagem.usuarios.tipo == "ADMIN" ? <img src='../../../public/coroa.png' className='w-4 h-4'></img> : ""}
        </div>
        <p className='text-zinc-500'>{formatarData(postagem.dataCriacao)}</p>
        </div>  
        <div
          className='bg-zinc-900 text-white resize-none rounded-lg p-2 ring-0 ring-transparent focus:outline-none w-full h-28'
        >
        {postagem.conteudo}
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default PostagemCard;
