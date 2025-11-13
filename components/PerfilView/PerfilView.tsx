'use client';
import React, { useEffect, useState } from 'react';
import { UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

type LanguageType = 'pt' | 'en' | 'es';

interface User {
  _id: string;
  nome: string;
  email: string;
  language?: LanguageType;
}

const PerfilView: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    language: 'pt' as LanguageType,
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // --- Busca o perfil logado ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado. Faça login novamente.');

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Falha ao carregar perfil.');

        const data: User = await res.json();
        setUser(data);
        setFormData({
          name: data.nome || '',
          language: data.language || 'pt',
        });
      } catch (err: any) {
        console.error('Erro ao buscar perfil:', err);
        setFeedback({ message: err.message, type: 'error' });
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Não foi possível carregar o perfil.',
          confirmButtonColor: '#b91c1c',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- Atualiza perfil ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'ID do usuário não encontrado.',
        confirmButtonColor: '#b91c1c',
      });
      return;
    }

    setIsUpdating(true);
    setFeedback(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/profile/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nome: formData.name, language: formData.language }),
      });

      if (!res.ok) throw new Error('Erro ao atualizar perfil.');

      const updated = await res.json();
      setUser(updated);
      setFeedback({ message: 'Perfil atualizado com sucesso! 🎉', type: 'success' });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Perfil atualizado com sucesso.',
        confirmButtonColor: '#0c4a6e',
      });
    } catch (err: any) {
      console.error('Erro ao atualizar perfil:', err);
      setFeedback({ message: 'Erro ao atualizar: ' + err.message, type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="text-center p-8 text-gray-500">Carregando perfil...</div>;

  const isFormModified = JSON.stringify(formData) !== JSON.stringify({
    name: user?.nome || '',
    language: user?.language || 'pt',
  });

  return (
    <div className="min-h-screen px-4 pt-10">
      <div className="max-w-4xl w-full mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-xl border border-gray-100">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0c4a6e] flex justify-center items-center mx-auto mb-2">
            <UserIcon className="w-7 h-7 mr-2 text-blue-600" /> Meu Perfil
          </h2>
          <p className="mt-2 text-sm text-[#2f6687]">
            Atualize suas informações pessoais e preferências de configuração.
          </p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-3 mb-6 border rounded-lg transition-all ${
              feedback.type === 'success'
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-red-100 border-red-400 text-red-700'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna 1: Informações Básicas */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-[#0c4a6e] border-b pb-2 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-blue-600" /> Informações Básicas
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full border border-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e] bg-gray-50 text-gray-700 transition duration-150"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email (Login)
              </label>
              <input
                id="email"
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full border border-gray-100 rounded-lg px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Coluna 2: Configurações */}
          <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 pt-6 lg:pt-0">
            <h3 className="text-xl font-semibold text-[#0c4a6e] border-b pb-2 mb-4 flex items-center">
              <Cog6ToothIcon className="w-5 h-5 mr-2 text-blue-600" /> Configurações
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="language">
                Idioma da Interface
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value as LanguageType })}
                className="w-full border border-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e] bg-white text-gray-700 transition duration-150 appearance-none"
              >
                <option value="pt">Português (Brasil)</option>
                <option value="en">English (United States)</option>
                <option value="es">Español (Latinoamérica)</option>
              </select>
            </div>
          </div>

          {/* Botão de salvar */}
          <div className="lg:col-span-3 flex justify-end border-t border-gray-100 pt-6">
            <button
              type="submit"
              disabled={isUpdating || !isFormModified}
              className={`px-6 py-2 text-white font-semibold rounded-lg transition duration-150 ${
                isUpdating || !isFormModified
                  ? 'bg-[#0c4a6e]/50 cursor-not-allowed'
                  : 'bg-[#0c4a6e] hover:bg-[#09415c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c4a6e]'
              }`}
            >
              {isUpdating ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PerfilView;
