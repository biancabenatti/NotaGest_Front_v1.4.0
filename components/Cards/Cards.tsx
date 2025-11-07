import React from "react";

const Cards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1 - Quantidade de uploads */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Quantidade de uploads
          </h2>
          <div className="h-6 w-6 text-[#0c4a6e]">
            {/* Ícone de upload */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-extrabold text-[#0c4a6e]">45</p>
        <span className="text-sm text-gray-500 mt-2 block">
          <span className="text-green-600 font-semibold">+10%</span> desde o mês passado
        </span>
      </div>

      {/* Card 2 - Armazenamento Usado */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Armazenamento Usado
          </h2>
          <div className="h-6 w-6 text-[#0c4a6e]">
            {/* Ícone de banco de dados */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10m-4 0h16a3 3 0 003-3V7a3 3 0 00-3-3H4a3 3 0 00-3-3m12 0v10m-4 0h-4a3 3 0 00-3-3V7a3 3 0 00-3-3z"
              />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-extrabold text-[#0c4a6e]">32 GB</p>
        <span className="text-sm text-gray-500 mt-2 block">
          de <span className="text-[#0c4a6e] font-semibold">100 GB</span> disponíveis
        </span>
      </div>

      {/* Card 3 - Notas Pendentes */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase">
            Notas Pendentes
          </h2>
          <div className="h-6 w-6 text-[#0c4a6e]">
            {/* Ícone de sino */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 11-4 0m4 0h-4"
              />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-extrabold text-[#0c4a6e]">12</p>
        <span className="text-sm text-gray-500 mt-2 block">
          <span className="text-red-600 font-semibold">Precisa de atenção</span>
        </span>
      </div>
    </div>
  );
};

export default Cards;