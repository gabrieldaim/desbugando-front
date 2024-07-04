import React from 'react';

const BotaoGenericoVerdeSalvamento = ({ img,texto, onClick,erro,loading,salvo,full }) => {
  return (
    <button
    disabled = {erro || loading}
      className={`rounded-md ${!erro ? `bg-green-600` : `bg-red-950`} px-8 py-2 min-w-28 ${full ? `w-full` : ``} text-base font-semibold ${!erro ? `text-white` : `text-zinc-500`} shadow-sm transition-colors duration-200 ease-in-out flex items-center justify-center hover:${!erro ? `bg-green-800` : ``}`}
      onClick={onClick}
      type='submit'
    >
      {loading ? <img src="../../public/loading.png" className="w-6 animate-spin"/> : 
                      salvo ? <img src="../../public/check.png" className="w-6"/> :
                        erro ? "" : <img src="../../public/save.png" className="w-6"/>} 
      {loading ? "" :
                        salvo ? "Salvo" : 
                        erro ? "Erro" : "Salvar"}
    </button>
  );
};

export default BotaoGenericoVerdeSalvamento;