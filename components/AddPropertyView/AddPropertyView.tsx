'use client';
import React, { useState } from 'react';

interface AddPropertyViewProps {
    onAddProperty: (property: string) => void;
}

const AddPropertyView: React.FC<AddPropertyViewProps> = ({ onAddProperty }) => {
    const [name, setName] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [type, setType] = useState('');

    const propertyTypes = ['Casa', 'Apartamento', 'Sítio', 'Chácara', 'Comercial'];

    const fetchAddressByCep = async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setStreet(data.logradouro);
                setNeighborhood(data.bairro);
                setCity(data.localidade);
                setState(data.uf);
            } else alert('CEP não encontrado.');
        } catch (error) {
            alert('Erro ao buscar o CEP.');
        }
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCep = e.target.value.replace(/\D/g, '');
        setCep(newCep);
        if (newCep.length === 8) fetchAddressByCep(newCep);
    };

    const handleSubmit = () => {
        if (!name || !type || !cep || !street || !number) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const fullAddress = `${street}, ${number} - ${neighborhood}, ${city} - ${state}, CEP: ${cep}`;
        onAddProperty(`Imóvel ${name} adicionado com sucesso!`);
        console.log({ name, type, address: fullAddress });

        // Resetar formulário
        setName(''); setCep(''); setStreet(''); setNumber('');
        setNeighborhood(''); setCity(''); setState(''); setType('');
    };

    return (
        <div className="bg-white min-h-screen pt-10 px-4">
            <div className="max-w-5xl w-full mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-gray-200">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-[#0c4a6e] leading-tight">Adicionar Novo Imóvel</h2>
                    <p className="mt-5 text-sm text-[#2f6687]">Cadastre as informações completas do novo imóvel.</p>
                </div>
                
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input 
                            type="text" 
                            placeholder="Nome do Imóvel" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                        <input 
                            type="text" 
                            placeholder="CEP" 
                            value={cep} 
                            onChange={handleCepChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder="Rua" 
                        value={street} 
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input 
                            type="text" 
                            placeholder="Bairro" 
                            value={neighborhood} 
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            value={city} 
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                        <input 
                            type="text" 
                            placeholder="Estado" 
                            value={state} 
                            onChange={(e) => setState(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <select 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        >
                            <option value="" disabled>Tipo de imóvel</option>
                            {propertyTypes.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                        <input 
                            type="text" 
                            placeholder="Número" 
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm placeholder-gray-500 focus:ring-[#0c4a6e] focus:border-[#0c4a6e]"
                        />
                    </div>
                    
                    <div className="flex justify-end pt-2">
                        <button 
                            type="button"
                            onClick={handleSubmit} 
                            className="px-8 py-2 font-bold text-white rounded-lg bg-[#0c4a6e] hover:bg-[#09415c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0c4a6e]"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyView;
