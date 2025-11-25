'use client';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(prev => !prev);

    // Funções simuladas para sidebar
    const handleListFiles = () => console.log('Listar arquivos');
    const handleListProperties = () => console.log('Listar propriedades');
    const generatePDF = () => console.log('Gerar PDF');
    const exportExcel = () => console.log('Exportar Excel');
    const setActiveView = (
        view: 'dashboard' | 'addFile' | 'addProperty' | 'perfil' | 'seguranca' | 'files' | 'properties'
    ) => console.log('Ativar view', view);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                handleListFiles={handleListFiles}
                handleListProperties={handleListProperties}
                generatePDF={generatePDF}
                exportExcel={exportExcel}
                setActiveView={setActiveView}
            />

            <div className="flex-1 flex flex-col">
                <HeaderAdmin toggleSidebar={toggleSidebar} setActiveView={setActiveView} />
                <main className="flex-1 overflow-auto p-4 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
