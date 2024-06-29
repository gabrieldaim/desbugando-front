import React from 'react';

const BotaoGenericoBranco = ({ texto, onClick }) => {
  return (
    <button
      className="rounded-md bg-white px-5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors duration-200 ease-in-out hover:bg-gray-200"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default BotaoGenericoBranco;
