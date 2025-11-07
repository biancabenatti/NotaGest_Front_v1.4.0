'use client';

import React, { useState, useMemo } from 'react';
import { IoTrashBinSharp, IoEyeOutline } from 'react-icons/io5';

interface FileData {
  id: number;
  title: string;
  value: number;
  purchaseDate: string;
  category: string;
  subcategory: string;
  property: string;
}

interface FileListProps {
  files: FileData[];
  deleteFile: (id: number) => void;
  showFiles: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, deleteFile, showFiles }) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  if (!showFiles) return null;

  const filteredFiles = useMemo(() => {
    let filtered = files.filter(f => f.title.toLowerCase().includes(search.toLowerCase()));
    if (categoryFilter) {
      filtered = filtered.filter(f => f.category === categoryFilter);
    }
    return filtered;
  }, [files, search, categoryFilter]);

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);

  return (
    <div className="p-4 mt-6">
      
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        {/* Filtro de categoria */}
        <div className="w-full md:w-1/4 relative">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border px-3 py-2 rounded w-full text-left"
          >
            <option value="">Todas as categorias</option>
            {[...new Set(files.map(f => f.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Título</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Valor</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Data da Compra</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Imóvel</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Categoria</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Subcategoria</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedFiles.map(file => (
              <tr key={file.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-2">{file.title}</td>
                <td className="px-4 py-2">R$ {file.value.toFixed(2)}</td>
                <td className="px-4 py-2">{file.purchaseDate}</td>
                <td className="px-4 py-2">{file.property}</td>
                <td className="px-4 py-2">{file.category}</td>
                <td className="px-4 py-2">{file.subcategory}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 p-1 rounded border border-gray-200"
                    onClick={() => alert(JSON.stringify(file, null, 2))}
                  >
                    <IoEyeOutline size={20} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 p-1 rounded border border-gray-200"
                    onClick={() => deleteFile(file.id)}
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

export default FileList;
