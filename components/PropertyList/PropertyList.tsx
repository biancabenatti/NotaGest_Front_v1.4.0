'use client';

import React, { useState, useMemo } from 'react';
import { IoTrashBinSharp } from 'react-icons/io5';

interface PropertyDataForUI {
  _id: string;
  nome: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  tipo?: string;
  cep?: string;
}

interface PropertyListProps {
  properties: PropertyDataForUI[];
  deleteProperty: (_id: string) => void;
  showProperties: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties: initialProperties, showProperties }) => {

  const [properties, setProperties] = useState(initialProperties);

  const [search, setSearch] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!showProperties) return null;

  // 👉 Função para deletar direto no backend
  const handleDeleteProperty = async (_id: string) => {
    console.log("🆔 ID recebido no DELETE:", _id);
    const confirmar = confirm("Tem certeza que deseja excluir este imóvel?");
    if (!confirmar) return;

    try {
      const response = await fetch(`${BASE_URL}/api/imoveis/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        alert("Erro ao excluir o imóvel.");
        return;
      }

      // Remove localmente da tabela
      setProperties(prev => prev.filter(item => item._id !== _id && item._id !== _id));

    } catch (error) {
      console.error("Erro ao deletar imóvel:", error);
    }
  };

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(p => p.nome.toLowerCase().includes(search.toLowerCase()));
    if (tipoFilter) {
      filtered = filtered.filter(p => p.tipo === tipoFilter);
    }
    return filtered;
  }, [properties, search, tipoFilter]);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 mt-6">

      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">

        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        {/* Filtro de tipo */}
        <div className="w-full md:w-1/4 relative">
          <select
            value={tipoFilter}
            onChange={e => setTipoFilter(e.target.value)}
            className="border px-3 py-2 rounded w-full text-left"
          >
            <option value="">Todos os tipos</option>
            {[...new Set(properties.map(p => p.tipo))].map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Nome</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Endereço</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Cidade</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Estado</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Tipo</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedProperties.map(prop => (
              <tr key={prop._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2">{prop.nome}</td>
                <td className="px-4 py-2">{`${prop.rua || ''}, ${prop.numero || ''} - ${prop.bairro || ''}`}</td>
                <td className="px-4 py-2">{prop.cidade}</td>
                <td className="px-4 py-2">{prop.estado}</td>
                <td className="px-4 py-2">{prop.tipo}</td>
                <td className="px-4 py-2 flex gap-2">

                  {/* Botão de deletar */}
                  <button
                    className="text-red-600 hover:text-red-800 p-1 rounded border border-gray-200"
                    onClick={() => {
                      console.log("👉 prop na lista:", prop);
                      console.log("👉 prop._id:", prop._id);
                      handleDeleteProperty(prop._id);
                    }}
                  >
                    <IoTrashBinSharp size={20} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Próxima
        </button>
      </div>

    </div>
  );
};

export default PropertyList;
