'use client';
import axios from 'axios';
import { IoMdCloudUpload } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export interface FileData {
    id: number;
    name: string;
    title: string;
    value: number;
    purchaseDate: string;
    observation?: string;
    category: string;
    subcategory: string;
    property: string;
    date?: string;
    size?: string;
    url?: string;
}

interface AddFileViewProps {
    onAddFile: (file: FileData) => void;
}

const AddFileView: React.FC<AddFileViewProps> = ({ onAddFile }) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [observation, setObservation] = useState('');
    const [category, setCategory] = useState('Construção');
    const [subcategory, setSubcategory] = useState('Iluminação');
    const [property, setProperty] = useState('');
    const [uploading, setUploading] = useState(false);
    const [properties, setProperties] = useState<{ id: string; nome: string }[]>([]);

    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const subcategories = ['Iluminação', 'Ferragem', 'Hidráulica', 'Acabamento', 'Pintura', 'Madeiramento', 'Outros'];

    // 🔹 Buscar imóveis do usuário logado
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.warn('⚠️ Token não encontrado.');
                    return;
                }

                const response = await axios.get(`${BASE_URL}/api/imoveis/nome`, {
                    headers: { Authorization: `Bearer ${token}` }
                });


                if (Array.isArray(response.data) && response.data.length > 0) {
                    const lista = response.data.map((imovel: any) => ({
                        id: imovel._id || imovel.id,
                        nome: imovel.nome || imovel.name || 'Sem nome'
                    }));
                    setProperties(lista);
                } else {
                    console.warn('Nenhum imóvel encontrado para este usuário.');
                }
            } catch (error) {
                console.error('❌ Erro ao buscar imóveis:', error);
            }
        };

        fetchProperties();
    }, [BASE_URL]);

    // 🔹 Envio e salvamento do arquivo + dados
    const handleSubmit = async () => {
        if (!file || !property) {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção!',
                text: 'Selecione um arquivo e um imóvel antes de continuar.',
                confirmButtonColor: '#0c4a6e'
            });
            return;
        }

        setUploading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Token não encontrado',
                    text: 'Faça login novamente para continuar.',
                    confirmButtonColor: '#0c4a6e'
                });
                return;
            }

            // 1️⃣ Enviar o arquivo para o backend
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axios.post(`${BASE_URL}/api/uploadfile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const filePath = uploadResponse.data.filePath;

            // 2️⃣ Montar o objeto com todos os dados esperados pelo backend
            const newFile = {
                title,
                value: parseFloat(value),
                purchaseDate,
                observation,
                category,
                subcategory,
                property,
                filePath
            };

            // 3️⃣ Salvar os metadados no banco
            await axios.post(`${BASE_URL}/api/uploads`, newFile, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // 4️⃣ Atualizar o estado local
            onAddFile({
                id: Date.now(),
                name: file.name,
                title,
                value: parseFloat(value),
                purchaseDate,
                observation,
                category,
                subcategory,
                property,
                date: new Date().toLocaleDateString(),
                size: `${(file.size / 1024).toFixed(2)} KB`,
                url: filePath
            });

            // 5️⃣ Limpar formulário
            setFile(null);
            setTitle('');
            setValue('');
            setPurchaseDate('');
            setObservation('');
            setProperty('');
            setCategory('Construção');
            setSubcategory('Iluminação');

            // ✅ Sucesso
            Swal.fire({
                icon: 'success',
                title: 'Nota fiscal salva!',
                text: 'Sua nota foi cadastrada com sucesso.',
                confirmButtonColor: '#0c4a6e'
            });

        } catch (error) {
            console.error('❌ Erro ao salvar nota:', error);

            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Erro ao salvar a nota fiscal.',
                confirmButtonColor: '#0c4a6e'
            });
        } finally {
            setUploading(false);
        }
    };
    return (
        <div className="bg-white min-h-screen pt-10 px-4">
            <div className="max-w-5xl w-full mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-[#0c4a6e] leading-tight">Registrar Nova Nota Fiscal</h2>
                    <p className="mt-1 text-sm text-[#2f6687]">Preencha os dados e anexe o comprovante.</p>
                </div>

                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="Título da Nota"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                        <input
                            type="number"
                            placeholder="Valor (R$)"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                            type="date"
                            value={purchaseDate}
                            onChange={(e) => setPurchaseDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                        <select
                            value={property}
                            onChange={(e) => setProperty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        >
                            <option value="" disabled>Selecione um imóvel</option>
                            {properties.length > 0 ? (
                                properties.map((imovel) => (
                                    <option key={imovel.id} value={imovel.id}>
                                        {imovel.nome}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Nenhum imóvel encontrado</option>
                            )}
                        </select>
                    </div>

                    <textarea
                        placeholder="Observações ou Descrição Detalhada"
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e] resize-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        >
                            <option value="Construção">Construção</option>
                            <option value="Reforma">Reforma</option>
                        </select>
                        <select
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        >
                            {subcategories.map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <label className="group flex items-center justify-center w-full border-2 border-blue-300 rounded-lg px-6 py-4 cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50">
                        <IoMdCloudUpload size={24} className="text-blue-400 group-hover:text-blue-500 transition-colors mr-3" />
                        <span className="text-blue-600 font-medium text-base">
                            {file ? file.name : 'Clique para anexar comprovante'}
                        </span>
                        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
                    </label>

                    <div className="flex justify-end pt-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={uploading}
                            className={`px-8 py-2 font-bold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg
                                ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0c4a6e] hover:bg-[#09415c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c4a6e]'}`}
                        >
                            {uploading ? 'Enviando...' : 'Salvar Nota Fiscal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFileView;
