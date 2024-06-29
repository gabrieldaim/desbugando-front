import React from 'react';

const BotaoGenericoSemBorda = ({ texto, onClick }) => {
  return (
    <button
      className="py-1 text-base font-semibold text-white"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoGenericoSemBorda;
