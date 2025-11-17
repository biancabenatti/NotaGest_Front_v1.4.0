'use client';

import React, { useState, useMemo } from 'react';
import { IoTrashBinSharp, IoDownloadOutline, IoPencilOutline } from 'react-icons/io5';

interface FileData {
  id: number;
  title: string;
  value: number;
  purchaseDate: string;
  category: string;
  subcategory: string;
  property: string | { _id: string; nome: string };
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

  const ITEMS_PER_PAGE = 8;

  if (!showFiles) return null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('pt-BR');
  };

  const filteredFiles = useMemo(() => {
    let filtered = files.filter(f =>
      f.title.toLowerCase().includes(search.toLowerCase())
    );
    if (categoryFilter) {
      filtered = filtered.filter(f => f.category === categoryFilter);
    }
    return filtered;
  }, [files, search, categoryFilter]);

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.max(1, Math.ceil(filteredFiles.length / ITEMS_PER_PAGE));

  const handleEditProperty = (id: number) => {
    console.log('Editar arquivo', id);
    // Aqui você pode abrir um modal de edição ou redirecionar para uma página de edição
  };

  const handleDownloadProperty = (id: number) => {
    console.log('Baixar arquivo', id);
    // Aqui você pode gerar um download, PDF ou CSV do arquivo
  };

  return (
    <div className="p-4 mt-6">

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-8">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        <div className="w-full md:w-1/4">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="border px-3 py-2 rounded w-full"
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
                <td className="px-4 py-2">{formatDate(file.purchaseDate)}</td>

                {/* IMÓVEL — agora com nome correto */}
                <td className="px-4 py-2">
                  {typeof file.property === 'object'
                    ? file.property.nome
                    : file.property}
                </td>

                <td className="px-4 py-2">{file.category}</td>
                <td className="px-4 py-2">{file.subcategory}</td>

                {/* Botões de ações */}
                <td className="px-4 py-2 flex gap-2">

                  {/* Botão de editar */}
                  <button
                    className="text-blue-600 hover:text-blue-800 p-1 rounded border border-gray-200"
                    onClick={() => handleEditProperty(file.id)}
                  >
                    <IoPencilOutline size={20} />
                  </button>

                  {/* Botão de baixar */}
                  <button
                    className="text-green-600 hover:text-green-800 p-1 rounded border border-gray-200"
                    onClick={() => handleDownloadProperty(file.id)}
                  >
                    <IoDownloadOutline size={20} />
                  </button>

                  {/* Botão de deletar */}
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
