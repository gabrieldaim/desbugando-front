import React from 'react';

const BotaoGenericoVerde = ({ texto, onClick }) => {
  return (
    <button
      className="rounded-md bg-green-600 px-8 py-2 text-base font-semibold text-white shadow-sm transition-colors duration-200 ease-in-out hover:bg-green-800"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoGenericoVerde;